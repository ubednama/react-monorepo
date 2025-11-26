import React, { useEffect, useState } from 'react';
import { TodoItem } from "./TodoItem";
import { CalendarPlus, Plus } from 'lucide-react';

export const ToDos = () => {
  let initTodo = localStorage.getItem("myTodoList") ? JSON.parse(localStorage.getItem("myTodoList")) : [];

  const [myTodoList, setToDos] = useState(initTodo);
  const [newToDo, setNewToDo] = useState("");

  const onDelete = (todo) => {
    setToDos(myTodoList.filter((e) => e !== todo));
    localStorage.setItem("myTodoList", JSON.stringify(myTodoList));
  };

  const addTodo = () => {
    if (newToDo.trim() === "") {
      alert("Please enter a todo");
      return;
    }

    const sno = myTodoList.length === 0 ? 0 : myTodoList[myTodoList.length - 1].sno;
    const myTodo = { sno: sno + 1, todo: newToDo, isComplete: false };

    setToDos([...myTodoList, myTodo]);
    setNewToDo('');
  };

  const markComplete = (sno) => {
    setToDos(myTodoList.map((todo) => (todo.sno === sno ? { ...todo, isComplete: !todo.isComplete } : todo)));
  };

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(myTodoList));
  }, [myTodoList]);

  return (
    <div className='bg-white dark:bg-black text-black dark:text-slate-300 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl dark:border dark:border-white-50'>
      <div className='flex items-center mt-7 gap-2'>
        <CalendarPlus className='size-8 cursor-pointer mr-2' />
        <h1 className='text-3xl font-semibold'>To-Do list</h1>
      </div>

      <div className='flex items-center my-7 bg-gray-200 dark:bg-gray-700 rounded-full'>
        <input
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
          type="text"
          placeholder='Add your task'
          className='bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600 dark:placeholder:text-slate-300'
        />
        <button
          onClick={addTodo}
          className='flex items-center justify-center gap-x-1 border-none rounded-full bg-orange-600 dark:bg-orange-500 w-32 h-12 text-white text-lg font-medium cursor-pointer'
        >
          ADD <Plus />
        </button>
      </div>

      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-400px)] sm:pr-3 scrollbar'>
        <div className='flex flex-col w-full'>
          {myTodoList.length === 0 ? (
            <div className='text-center'>No To-Dos to display</div>
          ) : (
            myTodoList.map((todo) => (
              <TodoItem todo={todo} key={todo.sno} onDelete={onDelete} markComplete={markComplete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};