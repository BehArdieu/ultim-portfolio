import React from 'react';
import { TodoFilters as TodoFiltersType, TodoStats } from '../types/Todo';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onFiltersChange: (filters: TodoFiltersType) => void;
  stats: TodoStats;
  categories: string[];
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFiltersChange,
  stats,
  categories,
  onClearCompleted,
}) => {
  const statusOptions = [
    { value: 'all', label: 'Toutes', count: stats.total },
    { value: 'active', label: 'Actives', count: stats.active },
    { value: 'completed', label: 'Terminées', count: stats.completed },
  ] as const;

  const priorityOptions = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'high', label: '🔴 Haute', count: stats.byPriority.high },
    { value: 'medium', label: '🟡 Moyenne', count: stats.byPriority.medium },
    { value: 'low', label: '🟢 Faible', count: stats.byPriority.low },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      {/* Statistics */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Statistiques</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-blue-800">Total</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-green-800">Terminées</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <div className="text-sm text-orange-800">Actives</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </div>
            <div className="text-sm text-purple-800">Complétées</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🔍 Filtres</h3>
        
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFiltersChange({ ...filters, status: option.value })}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.status === option.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priorité
          </label>
          <select
            value={filters.priority || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              priority: e.target.value ? e.target.value as any : undefined
            })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} {option.count !== undefined ? `(${option.count})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                category: e.target.value || undefined
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  🏷️ {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <button
              onClick={() => onFiltersChange({ status: 'all' })}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Réinitialiser les filtres
            </button>
            {stats.completed > 0 && (
              <button
                onClick={onClearCompleted}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Supprimer les terminées ({stats.completed})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};