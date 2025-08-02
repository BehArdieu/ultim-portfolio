import { useState, useEffect, useMemo } from 'react';
import { Todo, TodoFilters, TodoStats } from '../types/Todo';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
  });

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to parse stored todos:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description?: string, priority: Todo['priority'] = 'medium', category?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      category,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    updateTodo(id, { completed: !todos.find(t => t.id === id)?.completed });
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filtered todos based on current filters
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;
      if (filters.priority && todo.priority !== filters.priority) return false;
      if (filters.category && todo.category !== filters.category) return false;
      return true;
    });
  }, [todos, filters]);

  // Statistics
  const stats = useMemo((): TodoStats => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    const byPriority = todos.reduce((acc, todo) => {
      acc[todo.priority]++;
      return acc;
    }, { low: 0, medium: 0, high: 0 });

    return { total, completed, active, byPriority };
  }, [todos]);

  // Available categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(
      todos.map(todo => todo.category).filter(Boolean)
    ));
    return uniqueCategories.sort();
  }, [todos]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    filters,
    setFilters,
    stats,
    categories,
    actions: {
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      clearCompleted,
    }
  };
};