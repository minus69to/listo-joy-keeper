
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Priority } from '@/types/task';
import { toast } from '@/components/ui/use-toast';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, priority: Priority) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string, priority: Priority) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse the tasks and convert string dates back to Date objects
        return JSON.parse(savedTasks, (key, value) => {
          if (key === 'createdAt' || key === 'dueDate') {
            return value ? new Date(value) : undefined;
          }
          return value;
        });
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
        return [];
      }
    }
    return [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
      duration: 2000,
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
      duration: 2000,
      variant: "destructive",
    });
  };

  const editTask = (id: string, title: string, priority: Priority) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title, priority } : task
      )
    );
    toast({
      title: "Task updated",
      description: "Changes have been saved.",
      duration: 2000,
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};
