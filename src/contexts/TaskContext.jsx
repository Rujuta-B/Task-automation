import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../hooks/useAuth';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  users: [],
  loading: true,
  error: null
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
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
        // Fetch tasks based on role
        const tasksRef = collection(db, 'tasks');
        const tasksQuery = role === 'admin' 
          ? query(tasksRef)
          : query(tasksRef, where('assignedTo', '==', currentUser.uid));
        
        const taskSnapshot = await getDocs(tasksQuery);
        const tasks = taskSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        dispatch({ type: 'SET_TASKS', payload: tasks });

        // Only fetch users if admin
        if (role === 'admin') {
          const usersQuery = query(collection(db, 'users'));
          const userSnapshot = await getDocs(usersQuery);
          const users = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          dispatch({ type: 'SET_USERS', payload: users });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }

    fetchTasks();
  }, [currentUser, role]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}