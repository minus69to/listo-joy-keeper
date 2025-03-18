
import React, { useState } from 'react';
import { Task } from '@/types/task';
import { Check, Trash2, Edit, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useTaskContext } from '@/context/TaskContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  low: 'bg-blue-500',
  medium: 'bg-amber-500',
  high: 'bg-rose-500'
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, editTask } = useTaskContext();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTask(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      editTask(task.id, editedTitle, editedPriority);
      setIsEditDialogOpen(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        layout
        className={cn(
          "flex items-center justify-between p-4 rounded-xl mb-3 bg-white dark:bg-card",
          "border border-border shadow-sm transition-all duration-200",
          "hover:shadow-md group",
          task.completed && "opacity-70"
        )}
      >
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={handleToggle}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors",
              task.completed
                ? "bg-primary border-primary text-white"
                : "border-muted-foreground hover:border-primary"
            )}
          >
            {task.completed && <Check className="w-4 h-4" />}
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  priorityColors[task.priority]
                )}
              />
              <span className="text-xs text-muted-foreground">
                {priorityLabels[task.priority]}
              </span>
            </div>
            
            <h3
              className={cn(
                "text-base font-medium transition-all",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3 mr-1" />
              {format(task.createdAt, 'MMM d, h:mm a')}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full"
                placeholder="Enter task title"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup 
                value={editedPriority} 
                onValueChange={(val) => setEditedPriority(val as 'low' | 'medium' | 'high')}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="cursor-pointer">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="cursor-pointer">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
