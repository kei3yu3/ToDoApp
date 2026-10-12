import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Reactのコンポーネント分割', isDone: false, dueDate: '2026-10-12', category: '開発' },
    { id: 2, title: '画面設計の復習', isDone: true, dueDate: '2026-10-12', category: '開発' },
    { id: 3, title: 'ギターのトラスロッド調整', isDone: false, dueDate: '2026-10-15', category: '音楽' },
  ]);

  const addTask = (title: string, dueDate: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      isDone: false,
      dueDate: dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ★ 新しい処理：指定されたIDのタスクの完了状態（isDone）を反転させる
  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          // idが一致したタスクだけ、isDoneの中身を「現在の逆（!）」にする
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  return (
    <AppLayout>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>今週のタスク</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* ★ TaskListに「切り替える機能(toggleTaskDone)」を追加で渡す */}
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTaskDone={toggleTaskDone} />
    </AppLayout>
  );
}

export default App;