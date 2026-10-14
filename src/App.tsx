import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import type { Task, FilterType } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Reactのコンポーネント分割', isDone: false, dueDate: '2026-10-12', category: '開発' },
    { id: 2, title: '画面設計の復習', isDone: true, dueDate: '2026-10-12', category: '開発' },
    { id: 3, title: 'ギターのトラスロッド調整', isDone: false, dueDate: '2026-10-15', category: '音楽' },
  ]);

  // ★ 新しいState：現在選ばれている絞り込みモード（初期値は 'all'）
  const [filter, setFilter] = useState<FilterType>('all');

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

  // 指定されたIDのタスクの名前と日付を新しいものに書き換える
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

// ★ 新しい処理：現在の filter の値に合わせて、表示するタスクだけを抽出する関数
  const getFilteredTasks = () => {
    const today = new Date();
    
    // 今日の日付を「YYYY-MM-DD」形式の文字列にする
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // 今月の文字列「YYYY-MM」を作る
    const thisMonthStr = `${yyyy}-${mm}`;

    // 1週間後（7日後）の日付を計算して「YYYY-MM-DD」形式にする
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nwYyyy = nextWeek.getFullYear();
    const nwMm = String(nextWeek.getMonth() + 1).padStart(2, '0');
    const nwDd = String(nextWeek.getDate()).padStart(2, '0');
    const nextWeekStr = `${nwYyyy}-${nwMm}-${nwDd}`;

    // フィルターの条件に合わせて tasks を絞り込む
    return tasks.filter((task) => {
      if (filter === 'all') return true; // すべて表示
      if (filter === 'today') return task.dueDate === todayStr; // 今日と完全一致
      if (filter === 'month') return task.dueDate.startsWith(thisMonthStr); // 今月（前方一致）
      if (filter === 'week') {
        // 今日から1週間後までの範囲内か判定（文字列の辞書順比較が使えます）
        return task.dueDate >= todayStr && task.dueDate <= nextWeekStr;
      }
      return true;
    });
  };

  // ★ 絞り込まれた結果の配列を変数に入れる
  const filteredTasks = getFilteredTasks();

  // ★ 新しい処理：現在の filter の値に合わせて表示するタイトル文字列を決める
  const getPageTitle = () => {
    if (filter === 'all') return 'すべてのタスク';
    if (filter === 'today') return '今日のタスク';
    if (filter === 'week') return '今週のタスク';
    if (filter === 'month') return '今月のタスク';
    return 'タスク';
  };

  return (
    <AppLayout currentFilter={filter} onFilterChange={setFilter}>
      {/* ★ 固定の文字を削除し、getPageTitle() の結果を波括弧で埋め込む */}
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>{getPageTitle()}</h1>
      
      <TaskForm onAddTask={addTask} />
      
      {/* ★ 全件の tasks ではなく、絞り込み後の filteredTasks を渡すように変更！ */}
      <TaskList 
        tasks={filteredTasks} 
        onDeleteTask={deleteTask} 
        onToggleTaskDone={toggleTaskDone} 
        onEditTask={editTask} 
      />
    </AppLayout>
  );
}

export default App;