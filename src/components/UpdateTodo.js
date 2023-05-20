import React, {useState} from 'react';
import { Button,  TextField } from '@material-ui/core';

function UpdateTodo(props) {
  const data = props.data;
  const [updatedTodo, setUpdatedTodo] = useState(""); 
   
  function handleUpdate(){//Pass data to parent
    props.onUpdate(updatedTodo);
  }

  return (
  <div>
      <div style={{marginTop:"100px"}}>
        {/* Text box for update todo */}
      <TextField onChange={(evt)=>{setUpdatedTodo(evt.target.value)}} 
          placeholder={data.item.title} className="txt_todo" /> 
      {/* Update to do */}
      <Button variant='contained' color="secondary"  
        className='save_button' onClick={handleUpdate}>Update todo</Button>
      {/* Cancel update */}
      <Button variant='contained' color="primary"  
        className='save_button' onClick={props.onCancel}>Cancel</Button>
    </div>
  </div>
  );
}

export default UpdateTodo;