import React from 'react';
import { Circle, CircleCheck, Trash2 } from 'lucide-react';

export const TodoItem = ({ todo, onDelete, markComplete }) => {
  return (
    <>
      <div className='flex items-center my-3 gap-2'>
        <div className='flex flex-1 items-center cursor-pointer' onClick={()=>markComplete(todo.sno)}>
          {todo.isComplete ? <CircleCheck /> : <Circle />}
          <div className={`ml-4 text-sm ${todo.isComplete ? 'line-through' : ''}`}>{todo.todo}</div>
        </div>
        <div>
          <Trash2 className='w-5 cursor-pointer' onClick={() => { onDelete(todo) }} />
        </div>
      </div>
      <hr />
    </>
  )
}
