import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Create a new task
export const createTask = async (taskData) => {
  try {
    const tasksRef = collection(db, 'tasks');
    const newTask = {
      ...taskData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: taskData.status || 'pending'
    };
    
    const docRef = await addDoc(tasksRef, newTask);
    return { id: docRef.id, ...newTask };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update task status or other details
export const updateTask = async (taskId, updateData) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    const updates = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(taskRef, updates);
    return { id: taskId, ...updates };
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Get tasks assigned to specific employee
export const getEmployeeTasks = async (employeeId) => {
  try {
    const tasksRef = collection(db, 'tasks');
    const q = query(tasksRef, where('assignedTo', '==', employeeId));
    
    const querySnapshot = await getDocs(q);
    const tasks = [];
    
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    
    return tasks;
  } catch (error) {
    console.error('Error fetching employee tasks:', error);
    throw error;
  }
};

// Get all tasks (for admin)
export const getAllTasks = async () => {
  try {
    const tasksRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(tasksRef);
    const tasks = [];
    
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    
    return tasks;
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    throw error;
  }
};