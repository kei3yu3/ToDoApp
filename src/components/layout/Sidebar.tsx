import { useState } from 'react';
import type { FilterType, SortOrder } from '../../types';

// ★ 親から「現在のモード」と「切り替える機能」を受け取る
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

export const Sidebar = ({ currentFilter, onFilterChange, currentCategory, onCategoryChange, categories, onAddCategory, onDeleteCategory, currentSort, onSortChange, isOpen = false, onClose}: Props) => {
  // ★ 新しいカテゴリの名前を入力するためのState
  const [newCategoryName, setNewCategoryName] = useState('');

  // メニューの見た目を決める設定（選ばれているものは青色＋太字にする）
  const getListClass = (filter: FilterType) => {
    // 共通のクラス（余白、角丸、カーソル、色の変化アニメーション）
    const baseClass = "px-3 py-2 rounded-xl cursor-pointer mb-1.5 transition-all font-medium text-sm";
    
    if (currentFilter === filter) {
      // 選ばれている時のクラス
      return `${baseClass} bg-blue-500/80 text-white shadow-md backdrop-blur-sm`;
    } else {
      // 選ばれていない時（マウスを乗せると薄いグレーになる）
      return `${baseClass} text-gray-700 hover:bg-white/60 hover:shadow-sm`;
    }
  };

  // ★ 並び替えボタン用のデザインクラス
  const getSortButtonClass = (sort: SortOrder) => {
    const baseClass = "flex-1 py-1.5 px-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 cursor-pointer";
    if (currentSort === sort) {
      return `${baseClass} bg-blue-500/80 text-white shadow-md backdrop-blur-sm`;
    } else {
      return `${baseClass} bg-white/40 text-gray-700 hover:bg-white/60 border border-white/50`;
    }
  };

  // ★ 追加ボタンが押された時の処理
  const handleAddCategory = () => {
    if (!newCategoryName) return;
    onAddCategory(newCategoryName); // 親に変更を依頼
    setNewCategoryName(''); // 入力欄を空に戻す
  };

  // ★ スマホ時：メニュー外をタップした時の暗い背景（オーバーレイ）
  const overlayClass = isOpen 
    ? "fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity" 
    : "hidden";

  // ★ サイドバー本体：PCでもスマホでも、isOpen に応じてスライド開閉するように変更
  const sidebarClass = `
    fixed top-4 left-0 z-40 w-64 h-[calc(100vh-2rem)] transform transition-transform duration-300 ease-in-out
    px-6 pb-8 pt-16
    bg-white/25 backdrop-blur-md border-y border-r border-white/60 shadow-2xl rounded-r-3xl
    overflow-y-auto
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `;

  // スマホ画面（横幅768px未満）の時だけ、項目を選んだら自動でメニューを閉じる
  const handleSelectFilter = (filter: FilterType) => {
    onFilterChange(filter);
    if (window.innerWidth < 768) {
      onClose?.();
    }
  };

  return (
    <>
      <div className={overlayClass} onClick={onClose} />

      <div className={sidebarClass}>
        {/* ★ ハンバーガーボタンの下の領域だけをスクロール可能にするコンテナ */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <h2 className="text-base font-bold mb-2 text-gray-800">期間で絞り込み</h2>

          <ul className="list-none p-0 mb-5">
            <li className={getListClass('all')} onClick={() => handleSelectFilter('all')}>すべて</li>
            <li className={getListClass('today')} onClick={() => handleSelectFilter('today')}>今日</li>
            <li className={getListClass('week')} onClick={() => handleSelectFilter('week')}>今週</li>
            <li className={getListClass('month')} onClick={() => handleSelectFilter('month')}>今月</li>
          </ul>

          <h2 className="text-base font-bold mb-2 text-gray-800">期限で並び替え</h2>
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => onSortChange('asc')}
              className={getSortButtonClass('asc')}
              title="期限が近い順に並べる"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              昇順
            </button>
            <button
              onClick={() => onSortChange('desc')}
              className={getSortButtonClass('desc')}
              title="期限が遠い順に並べる"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              降順
            </button>
          </div>

          <h2 className="text-base font-bold mb-2 text-gray-800">カテゴリ</h2>
          
          <div className="flex gap-1.5 mb-3">
            <select
              value={currentCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="flex-1 p-2 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 cursor-pointer text-gray-700 text-sm"
            >
              <option value="all">すべてのカテゴリ</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {currentCategory !== 'all' && currentCategory !== '未設定' && (
              <button
                onClick={() => onDeleteCategory(currentCategory)}
                className="p-2 bg-red-500/80 text-white rounded-xl shadow-sm hover:bg-red-600 transition-colors cursor-pointer flex items-center justify-center"
                title="このカテゴリを削除"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="新しいカテゴリ"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full p-2 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 text-sm"
            />
            <button
              onClick={handleAddCategory}
              className="w-full py-2 bg-emerald-500/90 text-white font-bold rounded-xl shadow-md hover:bg-emerald-600 transition-colors cursor-pointer text-sm"
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </>
  );
};