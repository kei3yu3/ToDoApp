import { TaskItem } from './TaskItem';
import type { Task } from '../../types';

type Props = {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleTaskDone: (id: number) => void;
  // ★ 受け取るルールを追加
  onEditTask: (id: number, newTitle: string, newDueDate: string) => void;
};

export const TaskList = ({ tasks, onDeleteTask, onToggleTaskDone, onEditTask }: Props) => {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      {tasks.map((task) => (
        // ★ TaskItemへ編集機能をさらに渡す
        <TaskItem 
          key={task.id} 
          task={task} 
          onDeleteTask={onDeleteTask} 
          onToggleTaskDone={onToggleTaskDone} 
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
};