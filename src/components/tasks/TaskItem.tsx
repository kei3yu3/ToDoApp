import { useState } from 'react';
import type { Task } from '../../types';

// TaskListから受け取る個別タスクデータと操作関数の型定義
type Props = {
  task: Task;
  onDeleteTask: (id: number) => void;
  onToggleTaskDone: (id: number) => void;
  onEditTask: (id: number, newTitle: string, newDueDate: string) => void;
};

export const TaskItem = ({ task, onDeleteTask, onToggleTaskDone, onEditTask }: Props) => {
  // 編集モードの開閉状態と、編集中の入力値を管理するState
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);

  // 編集内容を保存して通常表示モードに戻す処理
  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEditTask(task.id, editTitle, editDueDate);
    setIsEditing(false);
  };

  return (
    // タスク1件分の行コンテナ（groupクラスでホバー状態を子要素に伝達）
    <div className="group flex items-start sm:items-center px-3 py-2.5 mb-1.5 bg-white hover:bg-zinc-50/80 border border-zinc-200/70 hover:border-zinc-300/80 rounded-xl transition-all">
      
      {/* タスクの完了・未完了を切り替えるチェックボックス */}
      <input 
        type="checkbox" 
        checked={task.isDone} 
        onChange={() => onToggleTaskDone(task.id)}
        className="w-4 h-4 mr-3 mt-1 sm:mt-0 cursor-pointer accent-zinc-900 rounded flex-shrink-0" 
      />
      
      {isEditing ? (
        // 編集モード時の表示：タスク名・期限の入力欄と保存・取消ボタン
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
          <input 
            type="text" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="w-full sm:flex-1 px-2 py-1 bg-white border border-zinc-300 rounded-md text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900/10" 
          />
          <div className="flex items-center gap-1.5 justify-end">
            <input 
              type="date" 
              value={editDueDate} 
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-2 py-1 bg-white border border-zinc-300 rounded-md text-xs text-zinc-600 focus:outline-none" 
            />
            <button 
              onClick={handleSave} 
              className="px-2.5 py-1 bg-zinc-900 text-white text-xs font-medium rounded-md hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              保存
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-md hover:bg-zinc-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              取消
            </button>
          </div>
        </div>
      ) : (
        // 通常モード時の表示（スマホでは上下2段、PCでは左右1列に配置）
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 min-w-0">
          
          {/* タスク名のテキスト（完了時は取り消し線と薄いグレーを適用） */}
          <span className={`text-sm break-words ${task.isDone ? 'line-through text-zinc-400' : 'text-zinc-800 font-medium'}`}>
            {task.title}
          </span>
          
          {/* 右側のメタ情報（カテゴリバッジ・期限日・操作ボタン） */}
          <div className="flex items-center justify-end flex-wrap gap-2 flex-shrink-0">
            
            {/* カテゴリバッジ（「未設定」以外の時のみ表示） */}
            {task.category && task.category !== '未設定' && (
              <span className="bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md text-[11px] font-medium border border-zinc-200/60 whitespace-nowrap">
                {task.category}
              </span>
            )}
            
            {/* カレンダーアイコン付きの期限日表示 */}
            {task.dueDate && (
              <span className="flex items-center gap-1 text-zinc-400 text-xs whitespace-nowrap font-variant-numeric tabular-nums">
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.dueDate}
              </span>
            )}
            
            {/* 編集・削除ボタン群（PCでは行にマウスを乗せた時のみ表示） */}
            <div className="flex items-center gap-0.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-1 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200/60 rounded-md transition-colors cursor-pointer"
                title="編集"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>

              <button 
                onClick={() => onDeleteTask(task.id)}
                className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                title="削除"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};