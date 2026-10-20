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
          
          {/* ★ 日付：カレンダーのSVGアイコン付きに変更 */}
          {task.dueDate && (
            <span className="flex items-center gap-1 text-gray-500 mr-4 text-sm whitespace-nowrap bg-white/40 px-2.5 py-1 rounded-full border border-white/40">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {task.dueDate}
            </span>
          )}
          
          {/* ★ 編集ボタン：ペンのSVGアイコン */}
          <button 
            onClick={() => setIsEditing(true)} 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-white/60 rounded-full transition-all cursor-pointer mr-1"
            title="編集"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          {/* ★ 削除ボタン：ゴミ箱のSVGアイコン */}
          <button 
            onClick={() => onDeleteTask(task.id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50/60 rounded-full transition-all cursor-pointer"
            title="削除"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};