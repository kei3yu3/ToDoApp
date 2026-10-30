import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import type { Task, FilterType } from './types';

// ★ 保存する時の「データの名前（合言葉）」を決めておく
const STORAGE_KEY = 'todo_app_tasks_v2';
const CATEGORIES_KEY = 'todo_app_categories_v2';

function App() {
  // ★ 初期値の設定を「ローカルストレージを確認する」ように変更
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // 保存されたデータがあれば、それを復元して使う
      return JSON.parse(saved);
    }
    // なければ、とりあえず最初の3件を入れる
    return [
      { id: 1, title: 'タスクの入力', isDone: false, dueDate: '2026-10-12', category: '未設定' },
    ];
  });

  // 現在選ばれている絞り込みモード（初期値は 'all'）
  const [filter, setFilter] = useState<FilterType>('all');
  // 現在選ばれているカテゴリ（初期値は 'all'）
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // ★ カテゴリのリスト
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    if (saved) return JSON.parse(saved);
    return ['未設定']; // 初期カテゴリ
  });

  // ★ tasks の中身が変わるたびに、自動的にローカルストレージへ保存する（重複を1つに統合）
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ★ categories の中身が変わるたびに、自動的にローカルストレージへ保存する
  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // ★ カテゴリを新しく追加する関数
  const addCategory = (newCategory: string) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // ★ カテゴリを削除する関数
  const deleteCategory = (targetCategory: string) => {
    if (targetCategory === '未設定') return;

    // 1. カテゴリ一覧から削除
    setCategories(categories.filter((c) => c !== targetCategory));

    // 2. 削除されたカテゴリを使っていたタスクを「未設定」に戻す
    setTasks(tasks.map((task) => 
      task.category === targetCategory ? { ...task, category: '未設定' } : task
    ));

    // 3. もし「今絞り込んでいるカテゴリ」を削除した場合は「すべて」に戻す
    if (categoryFilter === targetCategory) {
      setCategoryFilter('all');
    }
  };
  
  const addTask = (title: string, dueDate: string, category: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      isDone: false,
      dueDate: dueDate,
      category: category,
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

  // 現在の filter の値に合わせて、表示するタスクだけを抽出する関数
  const getFilteredTasks = () => {
    const today = new Date();
    
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const thisMonthStr = `${yyyy}-${mm}`;

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nwYyyy = nextWeek.getFullYear();
    const nwMm = String(nextWeek.getMonth() + 1).padStart(2, '0');
    const nwDd = String(nextWeek.getDate()).padStart(2, '0');
    const nextWeekStr = `${nwYyyy}-${nwMm}-${nwDd}`;

    // 1. filter と categoryFilter で絞り込む
    const filtered = tasks.filter((task) => {
      let isTimeMatch = true;
      if (filter === 'today') isTimeMatch = task.dueDate === todayStr;
      if (filter === 'month') isTimeMatch = task.dueDate.startsWith(thisMonthStr);
      if (filter === 'week') {
        isTimeMatch = task.dueDate >= todayStr && task.dueDate <= nextWeekStr;
      }

      let isCategoryMatch = true;
      if (categoryFilter !== 'all') {
        isCategoryMatch = task.category === categoryFilter;
      }

      return isTimeMatch && isCategoryMatch;
    });

    // 2. 絞り込んだ結果を sort で並び替えてから返す
    return filtered.sort((a, b) => {
      if (a.isDone !== b.isDone) {
        return a.isDone ? 1 : -1;
      }
      if (a.dueDate < b.dueDate) return -1;
      if (a.dueDate > b.dueDate) return 1;
      return 0;
    });
  };

  const filteredTasks = getFilteredTasks();

  const getPageTitle = () => {
    if (filter === 'all') return 'すべてのタスク';
    if (filter === 'today') return '今日のタスク';
    if (filter === 'week') return '今週のタスク';
    if (filter === 'month') return '今月のタスク';
    return 'タスク';
  };

  return (
    <AppLayout 
      currentFilter={filter} 
      onFilterChange={setFilter}
      currentCategory={categoryFilter}
      onCategoryChange={setCategoryFilter}
      categories={categories}
      onAddCategory={addCategory}
      onDeleteCategory={deleteCategory}
    >
      {/* ★ メイン領域全体を包む大きなすりガラスのボード */}
      <div className="p-6 md:p-8 bg-white/30 backdrop-blur-lg border border-white/60 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            {getPageTitle()}
          </h1>
          {/* 特定のカテゴリで絞り込んでいる時だけバッジを表示 */}
          {categoryFilter !== 'all' && (
            <span className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full text-sm font-medium text-blue-600 shadow-sm">
              {categoryFilter}
            </span>
          )}
        </div>

        <TaskForm onAddTask={addTask} categories={categories} />
        <TaskList 
          tasks={filteredTasks} 
          onDeleteTask={deleteTask} 
          onToggleTaskDone={toggleTaskDone} 
          onEditTask={editTask} 
        />
      </div>
    </AppLayout>
  );
}

export default App;