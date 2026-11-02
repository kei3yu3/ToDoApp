import { useState } from 'react';

// App.tsxから受け取るタスク追加関数とカテゴリ一覧の型定義
type Props = {
  onAddTask: (title: string, dueDate: string, category: string) => void;
  categories: string[];
};

export const TaskForm = ({ onAddTask, categories }: Props) => {
  // フォームの入力値（タスク名・期限・カテゴリ）を管理するState
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('未設定');

  // フォーム送信時にタスクを追加し、入力欄をリセットする処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title, dueDate, category);
    setTitle('');
    setDueDate('');
  };

  return (
    // タスク入力フォーム全体（スマホでは2段、PCでは横1列に統合されたバー）
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 mb-5 bg-zinc-50/80 border border-zinc-200/80 rounded-xl focus-within:bg-white focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-900/5 transition-all"
    >
      {/* タスク名のテキスト入力欄 */}
      <input
        type="text"
        placeholder="新しいタスクを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-2.5 py-1.5 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
      />
      
      {/* 期限選択・カテゴリ選択・追加ボタンのグループ */}
      <div className="flex items-center gap-1.5 justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200/60">
        {/* 期限日（カレンダー）入力欄 */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-2 py-1 bg-white border border-zinc-200/80 rounded-lg text-xs text-zinc-600 focus:outline-none focus:border-zinc-400 cursor-pointer"
        />

        {/* カテゴリの選択プルダウン */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 bg-white border border-zinc-200/80 rounded-lg text-xs text-zinc-600 focus:outline-none focus:border-zinc-400 cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* タスクの追加実行ボタン */}
        <button 
          type="submit" 
          className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
        >
          追加
        </button>
      </div>
    </form>
  );
};