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

  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  // ★ 新しい処理：指定されたIDのタスクの名前と日付を新しいものに書き換える
  const editTask = (id: number, newTitle: string, newDueDate: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle, dueDate: newDueDate };
        }
        return task;
      })
    );
  };

  return (
    <AppLayout>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>今週のタスク</h1>
      <TaskForm onAddTask={addTask} />
      
      {/* ★ TaskListに「編集する機能(editTask)」を追加で渡す */}
      <TaskList 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onToggleTaskDone={toggleTaskDone} 
        onEditTask={editTask} 
      />
    </AppLayout>
  );
}

export default App;