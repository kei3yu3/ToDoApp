import { useState } from 'react';
import type { FilterType, SortOrder } from '../../types';

// AppLayoutから受け取るデータの型定義
type Props = {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  isOpen?: boolean; 
  onClose?: () => void;
};

export const Sidebar = ({ 
  currentFilter, 
  onFilterChange, 
  currentCategory, 
  onCategoryChange, 
  categories, 
  onAddCategory, 
  onDeleteCategory, 
  currentSort,
  onSortChange,
  isOpen = true, 
  onClose 
}: Props) => {
  // 新規カテゴリの入力値を保持するState
  const [newCategoryName, setNewCategoryName] = useState('');

  // 期間フィルターの選択状態に応じたスタイルを返す関数
  const getListClass = (filter: FilterType) => {
    const baseClass = "px-2.5 py-1.5 rounded-lg cursor-pointer mb-0.5 transition-colors text-sm flex items-center justify-between";
    if (currentFilter === filter) {
      return `${baseClass} bg-zinc-900 text-white font-medium shadow-2xs`;
    } else {
      return `${baseClass} text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900`;
    }
  };

  // 並び替えボタン（昇順・降順）の選択状態に応じたスタイルを返す関数
  const getSortButtonClass = (sort: SortOrder) => {
    const baseClass = "flex-1 py-1 px-2.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1 cursor-pointer";
    if (currentSort === sort) {
      return `${baseClass} bg-white text-zinc-900 shadow-2xs ring-1 ring-zinc-950/5`;
    } else {
      return `${baseClass} text-zinc-500 hover:text-zinc-800`;
    }
  };

  // 新しいカテゴリを追加し、入力欄を空に戻す処理
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    onAddCategory(newCategoryName);
    setNewCategoryName('');
  };

  // スマホ表示時のみ、サイドバーの背面に表示する半透明の暗い背景
  const overlayClass = isOpen 
    ? "fixed inset-0 bg-zinc-950/20 backdrop-blur-xs z-30 md:hidden transition-opacity" 
    : "hidden";

  // サイドバー本体のスタイル（画面高さ固定・縦スクロール許可・スライド開閉）
  const sidebarClass = `
    fixed inset-y-0 left-0 z-40 w-60 h-screen
    transform transition-transform duration-200 ease-out
    px-4 pb-6 pt-14
    bg-zinc-100/80 backdrop-blur-md border-r border-zinc-200/80
    flex flex-col overflow-y-auto
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `;

  // 期間を選択した際、スマホ画面であれば自動でサイドバーを閉じる処理
  const handleSelectFilter = (filter: FilterType) => {
    onFilterChange(filter);
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  return (
    <>
      {/* スマホ用の背面オーバーレイ（タップでサイドバーを閉じる） */}
      <div className={overlayClass} onClick={onClose} />

      <aside className={sidebarClass}>
        {/* セクション1：期間による絞り込みメニュー */}
        <div className="mb-6">
          <h2 className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            表示期間
          </h2>
          <ul className="list-none p-0">
            <li className={getListClass('all')} onClick={() => handleSelectFilter('all')}>すべて</li>
            <li className={getListClass('today')} onClick={() => handleSelectFilter('today')}>今日</li>
            <li className={getListClass('week')} onClick={() => handleSelectFilter('week')}>今週</li>
            <li className={getListClass('month')} onClick={() => handleSelectFilter('month')}>今月</li>
          </ul>
        </div>

        {/* セクション2：期限による昇順・降順の並び替え切り替え */}
        <div className="mb-6">
          <h2 className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            期限の並び替え
          </h2>
          <div className="flex p-1 bg-zinc-200/70 rounded-lg">
            <button
              onClick={() => onSortChange('asc')}
              className={getSortButtonClass('asc')}
              title="期限が近い順"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              昇順
            </button>
            <button
              onClick={() => onSortChange('desc')}
              className={getSortButtonClass('desc')}
              title="期限が遠い順"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              降順
            </button>
          </div>
        </div>

        {/* セクション3：カテゴリの絞り込み・削除・新規追加 */}
        <div>
          <h2 className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            カテゴリ
          </h2>
          
          {/* カテゴリ選択プルダウンと削除ボタン */}
          <div className="flex gap-1.5 mb-3">
            <select
              value={currentCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="flex-1 px-2.5 py-1.5 bg-white border border-zinc-200/90 rounded-lg text-xs text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 cursor-pointer shadow-2xs"
            >
              <option value="all">すべてのカテゴリ</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* 「すべて」「未設定」以外のカテゴリ選択時のみ削除ボタンを表示 */}
            {currentCategory !== 'all' && currentCategory !== '未設定' && (
              <button
                onClick={() => onDeleteCategory(currentCategory)}
                className="p-1.5 text-zinc-400 hover:text-red-600 bg-white hover:bg-red-50 border border-zinc-200/90 rounded-lg transition-colors cursor-pointer flex items-center justify-center shadow-2xs"
                title="選択中のカテゴリを削除"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {/* 新しいカテゴリを追加する入力フォーム */}
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="新規カテゴリ..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              className="flex-1 min-w-0 px-2.5 py-1.5 bg-white border border-zinc-200/90 rounded-lg text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 shadow-2xs"
            />
            <button
              onClick={handleAddCategory}
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
            >
              追加
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};