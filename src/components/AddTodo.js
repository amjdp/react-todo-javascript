import React from 'react';
import './AddTodo.css';
import  {useState} from 'react';

import { Button, FormControl, Input, InputLabel } from '@material-ui/core';


function AddTodo(props) {

    const [newTodo, setNewTodo] = useState(""); // New todo

    const handleAddTodo = (event)=>{
        event.preventDefault();
        props.onAddTodo(newTodo);
        setNewTodo("")
       }

   return (
    <div>
        <div>
            <FormControl>
                {/* Label and textbox for new todo */}
                <InputLabel htmlFor="txt_todo" >New todo</InputLabel>
                <Input type="text" id="txt_todo" className="txt_todo" 
                    value={newTodo}
                    onChange={event=>setNewTodo(event.target.value)} />
            </FormControl>
            {/* Save button */}
            <Button variant='contained' color="secondary" 
                type="submit" className='save_button'
                onClick={handleAddTodo}>Add todo</Button>
        </div>
  </div>
   );
}

export default AddTodo;