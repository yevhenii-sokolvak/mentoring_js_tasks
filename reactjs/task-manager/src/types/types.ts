export default interface TaskItem {
    title: string;
    description: string;
    isCompleted: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';