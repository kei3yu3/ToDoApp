import type { FilterType } from '../../types';

// ★ 親から「現在のモード」と「切り替える機能」を受け取る
type Props = {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const Sidebar = ({ currentFilter, onFilterChange }: Props) => {
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

  return (
    <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #ccc', backgroundColor: '#f9fafb' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>メニュー</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {/* ★ クリックされたら、onFilterChange を使って親に変更を知らせる */}
        <li style={getListStyle('all')} onClick={() => onFilterChange('all')}>すべて</li>
        <li style={getListStyle('today')} onClick={() => onFilterChange('today')}>今日</li>
        <li style={getListStyle('week')} onClick={() => onFilterChange('week')}>今週</li>
        <li style={getListStyle('month')} onClick={() => onFilterChange('month')}>今月</li>
      </ul>
    </div>
  );
};