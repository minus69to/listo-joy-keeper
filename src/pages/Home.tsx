
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/Header';
import { TaskFilters } from '@/components/TaskFilters';
import { TaskItem } from '@/components/TaskItem';
import { AddTask } from '@/components/AddTask';
import { EmptyState } from '@/components/EmptyState';
import { useTaskContext } from '@/context/TaskContext';

type FilterOption = 'all' | 'pending' | 'completed';

const Home = () => {
  const { tasks } = useTaskContext();
  const [filter, setFilter] = useState<FilterOption>('all');
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  useEffect(() => {
    // Set isFirstRender to false after the component mounts
    setIsFirstRender(false);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getEmptyState = () => {
    if (tasks.length === 0) {
      return <EmptyState type="no-tasks" />;
    }
    
    if (filteredTasks.length === 0 && filter === 'completed') {
      return <EmptyState type="no-tasks" />;
    }
    
    if (filteredTasks.length === 0 && filter === 'pending') {
      return <EmptyState type="all-completed" />;
    }
    
    return null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-4 pb-24">
      <Header />
      
      <TaskFilters currentFilter={filter} setFilter={setFilter} />
      
      {getEmptyState()}
      
      <AnimatePresence initial={false}>
        {filteredTasks.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial={isFirstRender ? false : "hidden"}
            animate="show"
            className="space-y-1"
          >
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AddTask />
    </div>
  );
};

export default Home;
