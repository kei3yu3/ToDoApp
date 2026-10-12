import { useState } from 'react';

// 親から受け取る関数のルール
type Props = {
  onAddTask: (title: string, dueDate: string) => void;
};

export const TaskForm = ({ onAddTask }: Props) => {
  // 入力欄の文字を記憶するためのState
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  // 追加ボタンが押された時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 画面がリロードされるのを防ぐ
    
    if (!title) return; // タイトルが空っぽなら追加しない

    // ★ 親から渡された追加機能を実行！
    onAddTask(title, dueDate);

    // 追加した後は、入力欄を空に戻す
    setTitle('');
    setDueDate('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <input 
        type="text" 
        placeholder="＋ タスク名を入力..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '8px', width: '60%', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input 
        type="date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button 
        type="submit"
        style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        追加
      </button>
    </form>
  );
};