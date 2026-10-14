import type { FilterType } from '../../types';

// ★ 親から「現在のモード」と「切り替える機能」を受け取る
type Props = {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  currentCategory: string;
  onCategoryChange: (category: string) => void;
};

export const Sidebar = ({ currentFilter, onFilterChange, currentCategory, onCategoryChange }: Props) => {
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

  // ★ カテゴリ用の見た目設定関数
  const getCategoryStyle = (category: string) => ({
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: currentCategory === category ? '#f3e8ff' : 'transparent', // 紫色っぽくする
    color: currentCategory === category ? '#9333ea' : '#333',
    fontWeight: currentCategory === category ? 'bold' : 'normal',
    borderRadius: '4px',
    marginBottom: '5px'
  });

  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc', backgroundColor: '#f9fafb' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>期間で絞り込み</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
        <li style={getListStyle('all')} onClick={() => onFilterChange('all')}>すべて</li>
        <li style={getListStyle('today')} onClick={() => onFilterChange('today')}>今日</li>
        <li style={getListStyle('week')} onClick={() => onFilterChange('week')}>今週</li>
        <li style={getListStyle('month')} onClick={() => onFilterChange('month')}>今月</li>
      </ul>

      {/* ★ 新しいメニュー（カテゴリで絞り込み）を追加 */}
      <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>カテゴリ</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={getCategoryStyle('all')} onClick={() => onCategoryChange('all')}>すべてのカテゴリ</li>
        <li style={getCategoryStyle('開発')} onClick={() => onCategoryChange('開発')}>開発</li>
        <li style={getCategoryStyle('音楽')} onClick={() => onCategoryChange('音楽')}>音楽</li>
        <li style={getCategoryStyle('仕事')} onClick={() => onCategoryChange('仕事')}>仕事</li>
        <li style={getCategoryStyle('プライベート')} onClick={() => onCategoryChange('プライベート')}>プライベート</li>
      </ul>
    </div>
  );
};