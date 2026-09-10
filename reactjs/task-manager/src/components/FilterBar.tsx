import type { FilterStatus } from '../types/types';

interface FilterBarProps {
    value: FilterStatus;
    onChange: (value: FilterStatus) => void;
}

const filters: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'active', label: 'Активні' },
  { value: 'completed', label: 'Завершені' },
];

function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            value === filter.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;