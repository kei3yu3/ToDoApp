export const Sidebar = () => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f3f4f6', height: '100vh', padding: '20px' }}>
      <h2>アプリロゴ</h2>
      <div style={{ marginTop: '20px' }}>
        <p>■ 期間</p>
        <ul style={{ listStyle: 'none', paddingLeft: '10px', lineHeight: '2' }}>
          <li>今日</li>
          <li>今週</li>
          <li>今月</li>
        </ul>
      </div>
    </div>
  );
};