import React, { createContext, useContext, useReducer } from 'react';
import { initialTasks, initialUsers } from '../data/mockData';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id 
            ? { ...task, status: action.payload.status } 
            : task
        )
      };
    default:
      return state;
  }
};

const initialState = {
  tasks: initialTasks,
  users: initialUsers
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};