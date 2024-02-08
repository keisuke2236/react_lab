import React, { createContext, useReducer } from 'react';
import { initialTasks, tasksReducer } from './tasksReducer';
import { Tasks } from './tasksReducer';
import { Action } from './tasksReducer';

export const TasksContext = createContext<Tasks>([]);
export const TasksDispatchContext = createContext<React.Dispatch<Action>>(() => { });

export default function TasksProviders({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
