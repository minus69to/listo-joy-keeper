
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FilterOption = 'all' | 'pending' | 'completed';

interface TaskFiltersProps {
  currentFilter: FilterOption;
  setFilter: (filter: FilterOption) => void;
}

export function TaskFilters({ currentFilter, setFilter }: TaskFiltersProps) {
  const filters: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'To Do' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex p-1 rounded-lg bg-secondary mb-6">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant="ghost"
          className={cn(
            "flex-1 rounded-md font-normal transition-all",
            currentFilter === filter.value && "bg-background shadow-sm"
          )}
          onClick={() => setFilter(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
