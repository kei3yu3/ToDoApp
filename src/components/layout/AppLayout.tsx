import { useState } from 'react';
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
  // ★ スマホ用のサイドバー開閉状態を管理
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // ★ md:flex-row を追加し、PCでは横並び、スマホでは縦並びになるように設定
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      
      {/* ★ スマホ用ヘッダー（グラスモーフィズム） */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/40 backdrop-blur-md border-b border-white/60 sticky top-0 z-20 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">TodoApp</h1>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 bg-white/50 rounded-lg focus:outline-none transition-colors"
        >
          {/* ハンバーガーアイコン */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <Sidebar 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
        // ★ 開閉状態と、閉じるための関数をSidebarに渡す
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* メインコンテンツ */}
      <main className="flex-1 p-5 md:p-8 w-full max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
};