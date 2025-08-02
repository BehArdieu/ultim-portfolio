import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface AddTodoFormProps {
  onAdd: (title: string, description?: string, priority?: Todo['priority'], category?: string) => void;
  categories: string[];
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const finalCategory = newCategory.trim() || category || undefined;
      onAdd(
        title.trim(),
        description.trim() || undefined,
        priority,
        finalCategory
      );
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('');
      setNewCategory('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onFocus={() => setIsExpanded(true)}
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optionnelle)"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={2}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priorité
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="low">🟢 Faible</option>
                  <option value="medium">🟡 Moyenne</option>
                  <option value="high">🔴 Haute</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <div className="space-y-2">
                  {categories.length > 0 && (
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        if (e.target.value) setNewCategory('');
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => {
                      setNewCategory(e.target.value);
                      if (e.target.value) setCategory('');
                    }}
                    placeholder="Ou créer une nouvelle catégorie"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Réduire
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Ajouter la tâche
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};