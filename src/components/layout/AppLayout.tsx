import { useState } from 'react';
import { Sidebar } from './Sidebar';
import type { FilterType, SortOrder } from '../../types';

// 親コンポーネント(App.tsx)から受け取るデータの型定義
type Props = {
  children: React.ReactNode;
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
};

export const AppLayout = ({ 
  children, 
  currentFilter, 
  onFilterChange, 
  currentCategory, 
  onCategoryChange, 
  categories, 
  onAddCategory, 
  onDeleteCategory,
  currentSort,
  onSortChange
}: Props) => {
  // サイドバーの開閉状態を管理するState（初期値は開いた状態）
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // 画面全体のベース背景（落ち着いたニュートラルグレー）
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      
      {/* 画面左上に常駐するサイドバー開閉用のハンバーガーボタン */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-3.5 left-4 z-50 p-2 text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-100/80 border border-zinc-200/80 rounded-lg shadow-2xs focus:outline-none transition-all cursor-pointer"
        title="サイドバーを開閉"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* 左側のナビゲーションサイドバー */}
      <Sidebar 
        currentFilter={currentFilter} 
        onFilterChange={onFilterChange}
        currentCategory={currentCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
        currentSort={currentSort}
        onSortChange={onSortChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* メインコンテンツ領域（サイドバーの開閉に連動して左余白が変化） */}
      <main 
        className={`flex-1 px-4 pt-16 pb-12 md:px-10 md:pt-12 transition-all duration-200 ease-out ${
          isSidebarOpen ? 'md:ml-60' : 'md:ml-0'
        }`}
      >
        {/* コンテンツの横幅が広がりすぎないよう中央に配置するコンテナ */}
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};