import { Sidebar } from './Sidebar';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* 左側にサイドバーを配置 */}
      <Sidebar />
      
      {/* 右側にメインコンテンツ（childrenに入る中身）を配置 */}
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};