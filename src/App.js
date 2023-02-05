import React from "react";
import {AiOutlinePlus} from 'react-icons/ai';
import { useState, useEffect } from "react";
import Todo from "./Todo";
import {db} from './firebase';
import {collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore';
const style = {
bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-[10_35px_60px_-15px_rgba(0,0,0,1)] shadow hover:shadow-lg p-4`,
heading: `text-3xl font-bold text-center text-gray-800 p-2`,
form : `flex justify-between`,
input: `border p-2 w-full text-xl`,
button: `border p-4 ml-2 mt-0 bg-purple-500 text-slate-100`,
count: `text-center p-2`,
img: `float-left rounded-lg h-7 `
 
}
function App() {
  const [todos,settodos]=useState(['Bath','Practice']);
  const [inp, setInp]=useState(''); 
  //create
  const createTodo=async(e)=>
  { e.preventDefault(e);
    if(inp==='')
    {
      alert('No Task Entered?');
      return;
    }
    await addDoc(collection(db,'todos'),{
      text: inp,
      completed: false
    })
    setInp('');

  }

    //read
    
    
  useEffect(()=>
    { const q=query(collection(db,'todos'))
      const unsubscribe =onSnapshot(q,(querySnapshot)=>
      {
        let todosArr=[]
        querySnapshot.forEach((doc)=>
        {
          todosArr.push({...doc.data(),id: doc.id})
        })
        settodos(todosArr)
      })
    return ()=>unsubscribe();
    },[])
    //update
    const toggleComplete=async (todo)=>
    {
      await updateDoc(doc(db,'todos', todo.id),{
        completed: !todo.completed
      })

    }
    
    //delete
    const deleteTodo=async(id)=>
    {
       await deleteDoc(doc(db,'todos',id))
    }
    const output = todos.filter(todos => !todos.completed);
  return (



    
    <div className={style.bg}>
      
      <div className={style.container}>
        <img src='./logo.png' className={style.img} alt="logo"/>
        <h3 className={style.heading}>TaskMate</h3>
          <form  onSubmit={createTodo} className={style.form}>
            <input value={inp} onChange={(e)=>setInp(e.target.value)} className={style.input} type="text" placeholder="Add Your Tasks!"/>
            <button className={style.button}  ><AiOutlinePlus size={30} /></button>
             
          </form>
          <ul>
            {todos.map((todo, index)=>(
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            
            ))}
          </ul>
          <p className={style.count}>You have {output.length} Task(s) Remaining</p>

      </div>
    </div>
  );
}

export default App;
