import React from 'react';
import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';

function App() {
  const {
    todos,
    filters,
    setFilters,
    stats,
    categories,
    actions: { addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted }
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ✅ Gestionnaire de Tâches
          </h1>
          <p className="text-lg text-gray-600">
            Organisez vos tâches avec style et efficacité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters and stats */}
          <div className="lg:col-span-1">
            <TodoFilters
              filters={filters}
              onFiltersChange={setFilters}
              stats={stats}
              categories={categories}
              onClearCompleted={clearCompleted}
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Add Todo Form */}
            <AddTodoForm onAdd={addTodo} categories={categories} />

            {/* Todo List */}
            <div className="space-y-4">
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    Aucune tâche trouvée
                  </h3>
                  <p className="text-gray-600">
                    {stats.total === 0 
                      ? "Commencez par ajouter votre première tâche !"
                      : "Aucune tâche ne correspond aux filtres actuels."
                    }
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Vos tâches ({todos.length})
                    </h2>
                    {filters.status !== 'all' && (
                      <span className="text-sm text-gray-500">
                        Filtré par: {
                          filters.status === 'active' ? 'Actives' :
                          filters.status === 'completed' ? 'Terminées' : ''
                        }
                        {filters.priority && ` • Priorité: ${filters.priority}`}
                        {filters.category && ` • Catégorie: ${filters.category}`}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {todos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Créé avec ❤️ using React, TypeScript & Tailwind CSS
          </p>
          <p className="mt-1">
            Données sauvegardées localement dans votre navigateur
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
