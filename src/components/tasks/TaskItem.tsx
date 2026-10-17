import { useState } from 'react';
import type { Task } from '../../types';

type Props = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onToggleTaskDone: (id: number) => void;
  onEditTask: (id: number, newTitle: string, newDueDate: string) => void;
};

export const TaskItem = ({ task, onDeleteTask, onToggleTaskDone, onEditTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  const handleSave = () => {
    if (!editTitle) return;
    onEditTask(task.id, editTitle, editDueDate);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center p-4 mb-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl hover:shadow-md hover:bg-white/50 transition-all">
      <input 
        type="checkbox" 
        checked={task.isDone} 
        onChange={() => onToggleTaskDone(task.id)}
        // ★ チェックボックス専用の適切なサイズと余白に修正しました
        className="w-5 h-5 mr-4 cursor-pointer accent-blue-500 flex-shrink-0" 
      />
      
      {isEditing ? (
        // ★ 編集中：要素を横に並べるための div で囲みました
        <div className="flex-1 flex items-center gap-2">
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 p-1.5 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all text-gray-800" 
          />
          <input 
            type="date" 
            value={editDueDate} 
            onChange={(e) => setEditDueDate(e.target.value)}
            className="p-1.5 bg-white/60 border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-all text-gray-700" 
          />
          <button 
            onClick={handleSave} 
            className="px-3 py-1.5 bg-emerald-500/90 text-white rounded-lg shadow-sm hover:bg-emerald-600 transition-all cursor-pointer whitespace-nowrap"
          >
            保存
          </button>
          <button 
            onClick={() => setIsEditing(false)} 
            className="px-3 py-1.5 bg-gray-400/90 text-white rounded-lg shadow-sm hover:bg-gray-500 transition-all cursor-pointer whitespace-nowrap"
          >
            取消
          </button>
        </div>
      ) : (
        // ★ 通常時：styleを全て削除し、要素を横に並べる div で囲みました
        <div className="flex-1 flex items-center">
          <span className={`flex-1 text-lg ${task.isDone ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </span>
          
          {task.category && (
            <span className="bg-white/50 text-slate-600 px-3 py-1 rounded-full text-xs mr-3 border border-white/30 shadow-sm">
              {task.category}
            </span>
          )}
          
          <span className="text-gray-500 mr-4 text-sm whitespace-nowrap">
            ({task.dueDate})
          </span>
          
          <button 
            onClick={() => setIsEditing(true)} 
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white/60 rounded-full transition-all cursor-pointer mr-1"
            title="編集"
          >
            ✎
          </button>
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50/60 rounded-full transition-all cursor-pointer"
            title="削除"
          >
            🗑
          </button>
        </div>
      )}
    </div>
  );
};