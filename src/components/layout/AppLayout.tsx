import { Sidebar } from './Sidebar';
import type { FilterType } from '../../types';

//親から受け取るルールを追加
type Props = {
  children: React.ReactNode;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
};

export const AppLayout = ({ children, currentFilter, onFilterChange, currentCategory, onCategoryChange, categories, onAddCategory, onDeleteCategory }: Props) => {
  return (
    // ★ style を完全に削除し、すべて className に置き換えました
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Sidebar 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
      />
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  );
};