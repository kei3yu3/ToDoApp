import { useState } from 'react'; // ★ useStateを追加
import type { Task } from '../../types';

type Props = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onToggleTaskDone: (id: number) => void;
  // ★ 受け取るルールを追加
  onEditTask: (id: number, newTitle: string, newDueDate: string) => void;
};

export const TaskItem = ({ task, onDeleteTask, onToggleTaskDone, onEditTask }: Props) => {
  // ★ 編集モードかどうかを判定するState
  const [isEditing, setIsEditing] = useState(false);
  // ★ 編集中の「タスク名」と「日付」を一時的に記憶するState
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  // 保存ボタンが押された時の処理
  const handleSave = () => {
    if (!editTitle) return; // 空っぽなら保存しない
    onEditTask(task.id, editTitle, editDueDate); // 親に新しいデータを渡して上書き
    setIsEditing(false); // 編集モードを終了して通常の表示に戻す
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
      <input 
        type="checkbox" 
        checked={task.isDone} 
        onChange={() => onToggleTaskDone(task.id)}
        style={{ marginRight: '15px', width: '18px', height: '18px', cursor: 'pointer' }} 
      />
      
      {/* ★ isEditing が true(編集中) か false(通常時) かで表示を切り替える */}
      {isEditing ? (
        // --- ▼ 編集中（入力欄を表示） ▼ ---
        <>
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ flex: 1, marginRight: '10px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }} 
          />
          <input 
            type="date" 
            value={editDueDate} 
            onChange={(e) => setEditDueDate(e.target.value)}
            style={{ marginRight: '15px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }} 
          />
          <button onClick={handleSave} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px' }}>保存</button>
          <button onClick={() => setIsEditing(false)} style={{ padding: '4px 8px', cursor: 'pointer' }}>取消</button>
        </>
      ) : (
        // --- ▼ 通常時（テキストを表示） ▼ ---
        <>
          <span style={{ flex: 1, fontSize: '16px', textDecoration: task.isDone ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <span style={{ color: '#666', marginRight: '15px', fontSize: '14px' }}>
            ({task.dueDate})
          </span>
          {/* ★ クリックすると編集モード(isEditing = true)になる */}
          <button onClick={() => setIsEditing(true)} style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>✎</button>
          <button 
            onClick={() => onDeleteTask(task.id)}
            style={{ padding: '4px 8px', color: 'red', cursor: 'pointer' }}
          >
            🗑
          </button>
        </>
      )}
    </div>
  );
};