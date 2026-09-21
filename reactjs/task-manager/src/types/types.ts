export enum TaskCategory {
  Work = 'Робота',
  Study = 'Навчання',
  Personal = 'Особисте',
}

interface TaskItem {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    category: TaskCategory;
}

export type FilterStatus = 'all' | 'active' | 'completed';

export default TaskItem;