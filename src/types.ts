export type Task = {
  id: number;
  title: string;
  isDone: boolean;
  dueDate: string;
  category?: string; // ?は「なくても良い（任意）」という意味です
};