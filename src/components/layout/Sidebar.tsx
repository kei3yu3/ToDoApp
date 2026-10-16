import { useState } from 'react';
import type { FilterType } from '../../types';

// ★ 親から「現在のモード」と「切り替える機能」を受け取る
type Props = {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
};

export const Sidebar = ({ currentFilter, onFilterChange, currentCategory, onCategoryChange, categories, onAddCategory, onDeleteCategory }: Props) => {
  // ★ 新しいカテゴリの名前を入力するためのState
  const [newCategoryName, setNewCategoryName] = useState('');

  // メニューの見た目を決める設定（選ばれているものは青色＋太字にする）
  const getListClass = (filter: FilterType) => {
    // 共通のクラス（余白、角丸、カーソル、色の変化アニメーション）
    const baseClass = "p-2.5 rounded cursor-pointer mb-1 transition-colors";
    
    if (currentFilter === filter) {
      // 選ばれている時のクラス
      return `${baseClass} bg-sky-100 text-sky-600 font-bold`;
    } else {
      // 選ばれていない時（マウスを乗せると薄いグレーになる）
      return `${baseClass} text-gray-800 hover:bg-gray-200`;
    }
  };

  // ★ 追加ボタンが押された時の処理
  const handleAddCategory = () => {
    if (!newCategoryName) return;
    onAddCategory(newCategoryName); // 親に変更を依頼
    setNewCategoryName(''); // 入力欄を空に戻す
  };

  return (
    <div className="w-[200px] p-5 border-r border-gray-300 bg-gray-50">
      <h2 className="text-lg font-bold mb-4">期間で絞り込み</h2>
      <ul className="list-none p-0 mb-8">
        <li className={getListClass('all')} onClick={() => onFilterChange('all')}>すべて</li>
        <li className={getListClass('today')} onClick={() => onFilterChange('today')}>今日</li>
        <li className={getListClass('week')} onClick={() => onFilterChange('week')}>今週</li>
        <li className={getListClass('month')} onClick={() => onFilterChange('month')}>今月</li>
      </ul>

      <h2 className="text-lg font-bold mb-4">カテゴリ</h2>
      
      {/* ★ プルダウンと削除ボタンを横並びにする */}
      <div className="flex gap-1.5 mb-4">
        <select
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500"
        >
          <option value="all">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* ★ 「すべて」と「未設定」以外の時だけ、削除ボタンを表示する */}
        {currentCategory !== 'all' && currentCategory !== '未設定' && (
          <button
            onClick={() => onDeleteCategory(currentCategory)}
            className="p-2 bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600 transition-colors"
            title="このカテゴリを削除"
          >
            🗑
          </button>
        )}
      </div>

      {/* ★ 新しいカテゴリを追加するための入力欄とボタン */}
      <div className="flex gap-1.5">
        <input
          type="text"
          placeholder="新しいカテゴリ"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-1 p-1.5 rounded border border-gray-300 text-xs min-w-0 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="px-2.5 py-1.5 bg-emerald-500 text-white border-none rounded cursor-pointer text-xs whitespace-nowrap hover:bg-emerald-600 transition-colors"
        >
          追加
        </button>
      </div>
    </div>
  );
};