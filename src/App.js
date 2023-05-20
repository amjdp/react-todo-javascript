import "./App.css";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  InputLabel,
  List,
  ListItem,
  Typography,
  Snackbar
} from "@material-ui/core";

import { query, collection, doc, deleteDoc, updateDoc,
  getDocs, addDoc, serverTimestamp, docRef } from 'firebase/firestore';
import { db } from "./firebase";
import AddTodo from "./components/AddTodo";
import loading from './loading.gif';
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import UpdateTodo from "./components/UpdateTodo";

const collectionName = "todo_list";
const collectionRef = collection(db, collectionName);


function App() {
  const [todos, setTodos] = useState([]); // List of todos
  const [isLoading, setIsLoading] = useState(true); // To show loader at the time of loading
  const [sbOpen, setSbOpen] = useState(false); // Show/hide snackbar

  const [isEditEnabled, setIsEditEnabled] = useState(false); //Show edit screen
  const [currentTodo, setCurrentTodo] = useState(""); // To do for updating

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setTodos([]);
    const queryStatement = query(collectionRef);
    const querySnapshots = await getDocs(queryStatement);
    const data = [];
    querySnapshots.forEach((doc) => {
      data.push({ item: doc.data(), id: doc.id, ref: doc.ref });
    });
    setTodos(data);
    setIsLoading(false);
    console.log(data);
    // console.log(todos);
  }


   // Add new todo to the list
   function addTodo(newTodo){
    if(newTodo===""){
      setSbOpen(true);
      return;
    }
    async function post(){
      await addDoc(collection(db, collectionName), {
        title: newTodo,
        createdAt: serverTimestamp()
      })
      fetchData();
    }
    post();
  }

  
    // Close snack bar
    function handleSbClose(){
      setSbOpen(false);
    }
  

    function deleteTodo(id){
        const docRef = doc(db, collectionName, id);
        deleteDoc(docRef);
        fetchData();
    }

    // Show edit screen
  function handleEdit(eTodo){
    setIsEditEnabled(true);
    setCurrentTodo(eTodo);
  }


  

  // Close update screen
  function cancelUpdate(){
    setIsEditEnabled(false);
  }

    // Update todo
    function handleUpdate(uTodo){
      if(uTodo===""){
        setSbOpen(true);
        return;
      }
      const docRef = doc(db, collectionName, currentTodo.id);
      updateDoc(docRef, {"title":uTodo})
      fetchData();
      setIsEditEnabled(false);
    }
  

  return (
    <div className="App">
         <Typography variant="h3">To do list</Typography><hr/>
         { isEditEnabled ? <UpdateTodo data={currentTodo} 
      onCancel={cancelUpdate} onUpdate={handleUpdate}/>:
         <div><AddTodo onAddTodo={addTodo}/>
         {  isLoading && <img src={loading} alt="Loading..."/>}
      { !isLoading && <TodoList todos={todos} onDelete={deleteTodo}  onEdit={handleEdit}/>}
      </div>}
      <Footer/>
      {/* Display message */}
      <Snackbar
        open={sbOpen} autoHideDuration={2000} onClose={handleSbClose}
        message="Please enter something..."
        anchorOrigin={{vertical: "top", horizontal: "right"}}/>
  </div>
  );
}

export default App;
