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
  const getListStyle = (filter: FilterType) => ({
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: currentFilter === filter ? '#e0f2fe' : 'transparent',
    color: currentFilter === filter ? '#0284c7' : '#333',
    fontWeight: currentFilter === filter ? 'bold' : 'normal',
    borderRadius: '4px',
    marginBottom: '5px'
  });

  // ★ 追加ボタンが押された時の処理
  const handleAddCategory = () => {
    if (!newCategoryName) return;
    onAddCategory(newCategoryName); // 親に変更を依頼
    setNewCategoryName(''); // 入力欄を空に戻す
  };

  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc', backgroundColor: '#f9fafb' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>期間で絞り込み</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
        <li style={getListStyle('all')} onClick={() => onFilterChange('all')}>すべて</li>
        <li style={getListStyle('today')} onClick={() => onFilterChange('today')}>今日</li>
        <li style={getListStyle('week')} onClick={() => onFilterChange('week')}>今週</li>
        <li style={getListStyle('month')} onClick={() => onFilterChange('month')}>今月</li>
      </ul>

      <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>カテゴリ</h2>
      
      {/* ★ プルダウンと削除ボタンを横並びにする */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        <select
          value={currentCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer' }}
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
            style={{ padding: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            title="このカテゴリを削除"
          >
            🗑
          </button>
        )}
      </div>

      {/* ★ 新しいカテゴリを追加するための入力欄とボタン */}
      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type="text"
          placeholder="新しいカテゴリ"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', minWidth: '0' }}
        />
        <button
          onClick={handleAddCategory}
          style={{ padding: '6px 10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}
        >
          追加
        </button>
      </div>
    </div>
  );
};