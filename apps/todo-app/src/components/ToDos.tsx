"use client";
import React, { useEffect, useState } from 'react';
import { TodoItem } from "./TodoItem";
import { CalendarPlus, Plus } from 'lucide-react';
import { Button, Input } from "@repo/ui";

interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
}

export const ToDos = () => {
  const [myTodoList, setToDos] = useState<Todo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("myTodoList");
    const initTodo = stored ? JSON.parse(stored) : [];
    setToDos(initTodo);
  }, []);

  const toggle = (id: number) => {
    setToDos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    if (myTodoList.length > 0 || localStorage.getItem("myTodoList")) {
      localStorage.setItem("myTodoList", JSON.stringify(myTodoList));
    }
  }, [myTodoList]);

  const deleteTodo = (id: number) => {
    setToDos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const addTodo = () => {
    const inputElement = document.getElementById('inputBox') as HTMLInputElement;
    const inputText = inputElement.value;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    if (inputText === "") {
      return null;
    }
    setToDos((prev) => [...prev, newTodo]);
    inputElement.value = "";
  };

  return (
    <div className='w-full max-w-md bg-white dark:bg-stone-900 place-self-center rounded-xl p-6 sm:p-10 min-h-[550px] shadow-2xl transition-all duration-300 text-slate-800 dark:text-white'>

      <div className='flex items-center mt-4 mb-8 gap-3'>
        <CalendarPlus className='w-8 h-8 text-orange-600 dark:text-orange-500' />
        <h1 className='text-3xl font-bold text-slate-800 dark:text-white tracking-tight'>To-Do List</h1>
      </div>

      <div className='flex items-center my-7 bg-slate-100 dark:bg-stone-800 rounded-full shadow-inner transition-colors duration-200'>
        <Input
          id='inputBox'
          type="text"
          placeholder='Add your task'
          className='bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600 dark:placeholder:text-slate-300 text-slate-800 dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        <Button
          onClick={addTodo}
          className='flex items-center justify-center gap-x-1 border-none rounded-full bg-orange-600 dark:bg-orange-500 w-32 h-12 text-white text-lg font-medium cursor-pointer hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors'
        >
          ADD <Plus />
        </Button>
      </div>

      <div className='flex flex-wrap overflow-y-auto max-h-[calc(100vh-400px)] sm:pr-3 scrollbar'>
        <div className='flex flex-col w-full'>
          {myTodoList.length === 0 ? (
            <div className='text-center'>No To-Dos to display</div>
          ) : (
            myTodoList.map((todo) => (
              <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo} toggle={toggle} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};