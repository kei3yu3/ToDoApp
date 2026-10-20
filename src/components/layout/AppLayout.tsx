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
  // ★ PCで開いた時に最初から表示されるよう、初期値を true に設定
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // ★ md:flex-row を追加し、PCでは横並び、スマホでは縦並びになるように設定
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      
      {/* ★ Gemini風：PC・スマホ共通で左上に常駐するハンバーガーボタン */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 text-gray-700 hover:text-blue-600 bg-white/50 hover:bg-white/80 backdrop-blur-md border border-white/60 rounded-full shadow-sm focus:outline-none transition-all cursor-pointer"
        title="メニューを開閉"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

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
      
      {/* ★ メインコンテンツ：サイドバーの開閉に合わせて左の余白(md:ml-64)が滑らかに変化する */}
      <main 
        className={`flex-1 p-5 pt-20 md:p-8 md:pt-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
};