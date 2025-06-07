import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../hooks/useAuth';

const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  users: [],
  loading: false,
  error: null
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { currentUser, role } = useAuth();

  useEffect(() => {
    async function fetchTasks() {
      if (!currentUser) return;

      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Fetch users first
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch({ type: 'SET_USERS', payload: usersData });

        // Then fetch tasks
        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        const tasksData = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch({ type: 'SET_TASKS', payload: tasksData });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }

    fetchTasks();
  }, [currentUser, role]);

  const value = {
    state,
    dispatch
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}