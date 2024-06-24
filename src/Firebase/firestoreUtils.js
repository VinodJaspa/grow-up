// firestoreUtils.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestoreDb } from './firebaseConfig';
import { setUniversalLoading } from '../Redux/loadingState';
import { setUniversalMessage } from '../Redux/firestoreMessage';
import { getUserIdFromStore } from '../Comman/utils';
// Function to add tasks to Firestore using RTK Query
// Function to check if a taskTime slot is occupied for a given day
const isTimeSlotOccupied = async (day, taskTime) => {
  const userUid = getUserIdFromStore();
  const tasksCollection = collection(firestoreDb, 'task', userUid, 'tasks');
  const querySnapshot = await getDocs(
    query(tasksCollection, where('day', '==', day), where('taskTime', '==', taskTime))
  );
  return !querySnapshot.empty;
};

// Function to check if a task with the same name exists for a given day
const isTaskNameDuplicate = async (day, taskName) => {
  const userUid = getUserIdFromStore();
  const tasksCollection = collection(firestoreDb, 'task', userUid, 'tasks');
  const querySnapshot = await getDocs(
    query(tasksCollection, where('day', '==', day), where('taskName', '==', taskName))
  );
  return !querySnapshot.empty;
};

export const addTasksToFirestore = createAsyncThunk(
  'tasks/addTasksToFirestore',
  async (tasks, { dispatch }) => {
    try {
      const userUid = getUserIdFromStore();

      dispatch(setUniversalLoading(true));
      for (let task of tasks) {
        const { day, taskTime, taskName } = task;

        // Check if taskTime slot is occupied
        const timeOccupied = await isTimeSlotOccupied(day, taskTime);
        if (timeOccupied) {
          throw new Error(`Time slot ${taskTime} for day ${day} is already occupied.`);
        }

        // Check if task name is duplicate
        const taskNameDuplicate = await isTaskNameDuplicate(day, taskName);
        if (taskNameDuplicate) {
          throw new Error(`Task with name ${taskName} for day ${day} already exists.`);
     

        }

        const tasksCollection = collection(firestoreDb, 'task', userUid, 'tasks');
        await addDoc(tasksCollection, task);
      }
      dispatch(setUniversalLoading(false));
      let message = "Tasks successfully added."
      dispatch(setUniversalMessage({ message: message, isSuccess: true }));
    } catch (error) {
      dispatch(setUniversalLoading(false));
      dispatch(setUniversalMessage({ message: error.message, isSuccess: false }));
      console.error('Error adding tasks to Firestore: ', error);
      throw error; // Rethrow the error to handle in components if needed
    }
  }
);

// Function to query tasks from Firestore using RTK Query
export const queryTasksFromFirestore = createAsyncThunk(
  'tasks/queryTasksFromFirestore',
  async (criteria, { dispatch, rejectWithValue }) => {
    try {
      const userUid = getUserIdFromStore();

      dispatch(setUniversalLoading(true));

      console.log(criteria, "criteria");
      const tasksCollection = collection(firestoreDb, 'task', userUid, 'tasks'); // Assuming userUid is available
      let q;

      if (criteria.day) {
        q = query(tasksCollection, where('day', '==', criteria.day));
      } else {
        q = query(tasksCollection);
      }

      const querySnapshot = await getDocs(q);
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
    
      dispatch(setUniversalLoading(false));

      return tasks;
    } catch (error) {
      console.error('Error querying tasks from Firestore: ', error);
      dispatch(setUniversalLoading(false));

      return rejectWithValue(error.message); // Use rejectWithValue to send error message to reducer
    }
  }
);
//add to do to fire store
// Function to check if a todo with the same name exists for a given day
const isTodoNameDuplicate = async (day, todoName) => {
  const userUid = getUserIdFromStore();
  const todosCollection = collection(firestoreDb, 'todo', userUid, 'todolist');
  const querySnapshot = await getDocs(
    query(todosCollection, where('day', '==', day), where('todoName', '==', todoName))
  );
  return !querySnapshot.empty;
};

export const addTodoToFirestore = createAsyncThunk(
  'tasks/addTasksToFirestore',
  async (todo, { dispatch }) => {
    try {
      const userUid = getUserIdFromStore();

      dispatch(setUniversalLoading(true));

      const { day, todoName } = todo;

      // Check if todo name is duplicate for the same day
      const todoNameDuplicate = await isTodoNameDuplicate(day, todoName);
      if (todoNameDuplicate) {
        throw new Error(`Todo with name ${todoName} for day ${day} already exists.`);
      }

      const todosCollection = collection(firestoreDb, 'todo', userUid, 'todolist');
      await addDoc(todosCollection, todo);

      dispatch(setUniversalLoading(false));
      let message = "To do successfully added."
      dispatch(setUniversalMessage({ message: message, isSuccess: true }));
    } catch (error) {
      dispatch(setUniversalLoading(false));
      dispatch(setUniversalMessage({ message: error.message, isSuccess: false }));
      console.error('Error adding todo to Firestore: ', error.message);
      throw error; // Rethrow the error to handle in components if needed
    }
  }
);

//Get today to do list
// Function to query tasks from Firestore using RTK Query
export const queryTodoFromFirestore = createAsyncThunk(
  'tasks/queryTasksFromFirestore',
  async (criteria, { dispatch, rejectWithValue }) => {
    try {
      const userUid = getUserIdFromStore();

      dispatch(setUniversalLoading(true));

      console.log(criteria, "criteria");
      const todoCollection = collection(firestoreDb, 'todo', userUid, 'todolist'); // Assuming userUid is available
      let q;

      if (criteria.day) {
        q = query(todoCollection, where('day', '==', criteria.day));
      } else {
        q = query(todoCollection);
      }

      const querySnapshot = await getDocs(q);
      const todo = [];
      querySnapshot.forEach((doc) => {
        todo.push({ id: doc.id, ...doc.data() });
      });

      dispatch(setUniversalLoading(false));

      return todo;
    } catch (error) {
      console.error('Error querying todo from Firestore: ', error);
      dispatch(setUniversalLoading(false));

      return rejectWithValue(error.message); // Use rejectWithValue to send error message to reducer
    }
  }
);