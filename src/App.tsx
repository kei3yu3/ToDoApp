import { useState, useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { TaskForm } from './components/tasks/TaskForm';
import { TaskList } from './components/tasks/TaskList';
import type { Task, FilterType, SortOrder } from './types';

// ローカルストレージにデータを保存する際のキー名
const STORAGE_KEY = 'todo_app_tasks_v2';
const CATEGORIES_KEY = 'todo_app_categories_v2';

function App() {
  // タスク一覧のState（初回読み込み時にローカルストレージから復元）
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Reactのコンポーネント分割', isDone: false, dueDate: '2026-10-12', category: '未設定' },
      { id: 2, title: '画面設計の復習', isDone: true, dueDate: '2026-10-12', category: '未設定' },
      { id: 3, title: 'ギターのトラスロッド調整', isDone: false, dueDate: '2026-10-15', category: '未設定' },
    ];
  });

  // 絞り込み（期間・カテゴリ）と並び替え順序を管理するState
  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // カテゴリ一覧のState（初回読み込み時にローカルストレージから復元）
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    if (saved) return JSON.parse(saved);
    return ['未設定'];
  });

  // tasksが更新されるたびにローカルストレージへ自動保存する処理
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // categoriesが更新されるたびにローカルストレージへ自動保存する処理
  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // 重複をチェックして新しいカテゴリを追加する関数
  const addCategory = (newCategory: string) => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // 指定したカテゴリを削除し、該当タスクを「未設定」に戻す関数
  const deleteCategory = (targetCategory: string) => {
    if (targetCategory === '未設定') return;
    setCategories(categories.filter((c) => c !== targetCategory));
    setTasks(tasks.map((task) => 
      task.category === targetCategory ? { ...task, category: '未設定' } : task
    ));
    if (categoryFilter === targetCategory) {
      setCategoryFilter('all');
    }
  };
  
  // 新しいタスクを作成してリストに追加する関数
  const addTask = (title: string, dueDate: string, category: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      isDone: false,
      dueDate,
      category,
    };
    setTasks([...tasks, newTask]);
  };

  // 指定されたIDのタスクを削除する関数
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 指定されたIDのタスクの完了・未完了状態を切り替える関数
  const toggleTaskDone = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isDone: !task.isDone } : task))
    );
  };

  // 指定されたIDのタスク名と期限を更新する関数
  const editTask = (id: number, newTitle: string, newDueDate: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: newTitle, dueDate: newDueDate } : task))
    );
  };

  // 現在のフィルター条件と並び替え設定に基づいて表示用タスクを抽出する関数
  const getFilteredTasks = () => {
    // 今日・今月・1週間後の日付文字列（YYYY-MM-DD）を生成
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

    // 期間とカテゴリの両方の条件に合致するタスクを抽出
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

    // 未完了タスクを優先しつつ、指定された順序（昇順・降順）で期限を並び替え
    return filtered.sort((a, b) => {
      if (a.isDone !== b.isDone) return a.isDone ? 1 : -1;
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && !b.dueDate) return -1;
      if (a.dueDate < b.dueDate) return sortOrder === 'asc' ? -1 : 1;
      if (a.dueDate > b.dueDate) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // 絞り込みと並び替えが完了したタスク配列を取得
  const filteredTasks = getFilteredTasks();

  // 現在選択されている期間フィルターに応じた見出しタイトルを返す関数
  const getPageTitle = () => {
    if (filter === 'all') return 'すべてのタスク';
    if (filter === 'today') return '今日のタスク';
    if (filter === 'week') return '今週のタスク';
    if (filter === 'month') return '今月のタスク';
    return 'タスク';
  };

  return (
    // 全体のレイアウト枠に各種状態と操作関数を渡す
    <AppLayout 
      currentFilter={filter} 
      onFilterChange={setFilter}
      currentCategory={categoryFilter}
      onCategoryChange={setCategoryFilter}
      categories={categories}
      onAddCategory={addCategory}
      onDeleteCategory={deleteCategory}
      currentSort={sortOrder}
      onSortChange={setSortOrder}
    >
      {/* メインのタスクボード（白背景と繊細な1pxボーダー） */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-2xs p-5 md:p-7">
        
        {/* ヘッダー部分：ページ見出し・選択中カテゴリバッジ・未完了タスク件数 */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">
              {getPageTitle()}
            </h1>
            {categoryFilter !== 'all' && (
              <span className="px-2 py-0.5 bg-zinc-100 border border-zinc-200/80 rounded-md text-xs font-medium text-zinc-600">
                {categoryFilter}
              </span>
            )}
          </div>
          <span className="text-xs text-zinc-400 font-medium">
            {filteredTasks.filter(t => !t.isDone).length} 件の未完了
          </span>
        </div>

        {/* 新規タスクの入力フォームとタスクリスト本体 */}
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