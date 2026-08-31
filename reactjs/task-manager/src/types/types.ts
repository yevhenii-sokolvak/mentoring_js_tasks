export default interface TaskItem {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
}

export type FilterStatus = 'all' | 'active' | 'completed';