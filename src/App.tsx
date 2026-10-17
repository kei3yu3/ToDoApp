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
      { id: 1, title: 'Reactのコンポーネント分割', isDone: false, dueDate: '2026-10-12', category: '未設定' },
      { id: 2, title: '画面設計の復習', isDone: true, dueDate: '2026-10-12', category: '未設定' },
      { id: 3, title: 'ギターのトラスロッド調整', isDone: false, dueDate: '2026-10-15', category: '未設定' },
    ];
  });

  // 現在選ばれている絞り込みモード（初期値は 'all'）
  const [filter, setFilter] = useState<FilterType>('all');
  // 現在選ばれているカテゴリ（初期値は 'all'）
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // ★ 新しいState：カテゴリのリスト
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(CATEGORIES_KEY);
    if (saved) return JSON.parse(saved);
    return ['未設定']; // 初期カテゴリ
  });

  // ★ tasksの保存に加えて、categoriesも保存するuseEffectを追加
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // ★ カテゴリを新しく追加する関数
  const addCategory = (newCategory: string) => {
    // 空白じゃなく、かつ、まだ存在しないカテゴリなら追加する
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  // ★ 新しい処理：カテゴリを削除する関数
  const deleteCategory = (targetCategory: string) => {
    // 「未設定」は削除できないように守る
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

  // ★ 新しい処理：tasks の中身が変わるたびに、自動的に保存する
  useEffect(() => {
    // tasksデータを文字列（JSON）に変換してブラウザに保存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]); // ← この [tasks] が「tasksが変化した時だけ実行してね」という指示
  
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

    // ★ 1. まずは今まで通り filter で絞り込む
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

    // ★ 2. 絞り込んだ結果 (filtered) を sort で並び替えてから返す
    return filtered.sort((a, b) => {
      // ① 完了・未完了での並び替え（未完了を上に、完了済みを下に）
      if (a.isDone !== b.isDone) {
        // a が完了済み(true)なら後ろへ(1)、未完了(false)なら前へ(-1)
        return a.isDone ? 1 : -1;
      }

      // ② 完了状態が同じ場合（両方未完了、または両方完了済み）は、日付の近い順（昇順）にする
      if (a.dueDate < b.dueDate) return -1; // aの日付のほうが古ければ前へ(-1)
      if (a.dueDate > b.dueDate) return 1;  // aの日付のほうが新しければ後ろへ(1)
      
      return 0; // 日付も同じなら順番はそのまま
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
    // ★ AppLayout に categoryFilter と setCategoryFilter を追加で渡す
    <AppLayout 
      currentFilter={filter} 
      onFilterChange={setFilter}
      currentCategory={categoryFilter}
      onCategoryChange={setCategoryFilter}
      categories={categories}
      onAddCategory={addCategory}
      onDeleteCategory={deleteCategory}
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-5">{getPageTitle()}</h1>
      <TaskForm onAddTask={addTask} categories={categories}/>
      <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleTaskDone={toggleTaskDone} onEditTask={editTask} />
    </AppLayout>
  );
}

export default App;