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
  // ★ タスクが1つもない時の表示（これもグラスモーフィズム化）
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl">
        タスクがありません。上のフォームから追加してみましょう！
      </div>
    );
  }

  return (
    // ★ 白い背景を消して、TaskItemを縦に並べるだけの透明なコンテナに変更
    <div className="flex flex-col">
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