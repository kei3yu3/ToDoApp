import { Sidebar } from './Sidebar';
import type { FilterType } from '../../types';

// ★ 親から受け取るルールを追加
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ★ Sidebar へ横流しする */}
      <Sidebar 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
      />
      
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f3f4f6' }}>
        {children}
      </main>
    </div>
  );
};