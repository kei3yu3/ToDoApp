export type Task = {
  id: number;
  title: string;
  isDone: boolean;
  dueDate: string;
  category?: string; // ?は「なくても良い（任意）」という意味です
};

// （すべて、今日、今週、今月 の4種類のどれかになるというルール）
export type FilterType = 'all' | 'today' | 'week' | 'month';
//昇順（asc）か降順（desc）かを表す SortOrder 型
export type SortOrder = 'asc' | 'desc';