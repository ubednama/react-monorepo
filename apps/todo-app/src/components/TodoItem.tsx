"use client";
import React from 'react';
import { Circle, CircleCheck, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    isComplete: boolean;
  };
  deleteTodo: (id: number) => void;
  toggle: (id: number) => void;
}

export const TodoItem = ({ todo, deleteTodo, toggle }: TodoItemProps) => {
  return (
    <>
      <div className='flex items-center my-3 gap-2'>
        <div className='flex flex-1 items-center cursor-pointer' onClick={() => toggle(todo.id)}>
          {todo.isComplete ? <CircleCheck className="text-orange-600 dark:text-orange-500" /> : <Circle className="text-slate-400 dark:text-slate-500" />}
          <div className={`ml-4 text-sm ${todo.isComplete ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>{todo.text}</div>
        </div>
        <div>
          <Trash2 className='w-5 cursor-pointer text-slate-400 hover:text-red-500 transition-colors' onClick={() => { deleteTodo(todo.id) }} />
        </div>
      </div>
      <hr />
    </>
  )
}
