
import React from 'react';
import { CheckCircle, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  type: 'no-tasks' | 'all-completed';
}

export function EmptyState({ type }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {type === 'no-tasks' ? (
        <>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              delay: 0.2 
            }}
            className="mb-4 p-4 rounded-full bg-secondary text-primary"
          >
            <ListChecks className="h-10 w-10" />
          </motion.div>
          <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
          <p className="text-muted-foreground max-w-xs">
            Create your first task by tapping on the + button below
          </p>
        </>
      ) : (
        <>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              delay: 0.2 
            }}
            className="mb-4 p-4 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
          >
            <CheckCircle className="h-10 w-10" />
          </motion.div>
          <h3 className="text-xl font-medium mb-2">All tasks completed</h3>
          <p className="text-muted-foreground max-w-xs">
            You've completed all your tasks. Great job!
          </p>
        </>
      )}
    </motion.div>
  );
}
