import { useState } from 'react';

type Props = {
  onAddTask: (title: string, dueDate: string, category: string) => void;
  categories: string[];
};

export const TaskForm = ({ onAddTask, categories }: Props) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState(categories[0] || '未設定');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onAddTask(title, dueDate, category);
    setTitle('');
    setDueDate('');
    setCategory('開発');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      // ★ グラスモーフィズムのコンテナ設定（半透明の白、すりガラス、大きな丸み、白いフチ、柔らかい影）
      className="mb-5 p-5 bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl flex flex-wrap gap-3 items-center"
    >
      <input 
        type="text" 
        placeholder="＋ タスク名を入力..." 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // ★ 入力欄も少し透けさせ、丸みを強くする（rounded-xl）
        className="flex-1 min-w-[200px] p-2.5 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 transition-all text-gray-800 placeholder-gray-500"
      />
      <input 
        type="date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2.5 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 transition-all text-gray-700"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2.5 bg-white/60 border border-white/50 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300/50 transition-all cursor-pointer text-gray-700"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button 
        type="submit"
        // ★ ボタンはAppleらしく、完全に丸いカプセル型（rounded-full）にし、少し立体感を出す
        className="px-6 py-2.5 bg-blue-500/90 text-white font-bold rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
      >
        追加
      </button>
    </form>
  );
};