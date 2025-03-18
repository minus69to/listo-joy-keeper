
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  dueDate?: Date;
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
}
