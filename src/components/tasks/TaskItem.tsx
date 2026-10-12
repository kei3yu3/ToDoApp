import type { Task } from '../../types';

type Props = {
  task: Task;
  onDeleteTask: (id: number) => void;
  // ★ 受け取るルールを追加
  onToggleTaskDone: (id: number) => void;
};

export const TaskItem = ({ task, onDeleteTask, onToggleTaskDone }: Props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee', backgroundColor: '#fff' }}>
      <input 
        type="checkbox" 
        checked={task.isDone} 
        // ★ onChangeを追加し、チェックされたらIDを渡して状態を切り替える（readOnlyは消す）
        onChange={() => onToggleTaskDone(task.id)}
        style={{ marginRight: '15px', width: '18px', height: '18px', cursor: 'pointer' }} 
      />
      
      <span style={{ flex: 1, fontSize: '16px', textDecoration: task.isDone ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      
      <span style={{ color: '#666', marginRight: '15px', fontSize: '14px' }}>
        ({task.dueDate})
      </span>
      
      <button style={{ marginRight: '5px', padding: '4px 8px', cursor: 'pointer' }}>✎</button>
      <button 
        onClick={() => onDeleteTask(task.id)}
        style={{ padding: '4px 8px', color: 'red', cursor: 'pointer' }}
      >
        🗑
      </button>
    </div>
  );
};