import React from 'react';
import './Footer.css';

import { List, ListItem } from '@material-ui/core';
import {DeleteForever, Edit} from "@material-ui/icons";

function TodoList(props) {
    const todos=props.todos;
   return (
    //  Show lis tof tods
     todos.map(todo =>
        <List className="todo">                        
            <ListItem className="list-item" key={todo.id}> 
                    {todo.item.title}
                    </ListItem>
            {/* Pass id of todo to parent on clicking delete button */}
            <DeleteForever onClick = {()=>{props.onDelete(todo.id)}} />
            {/* Pass data to parent on clickin edit */}
            <Edit onClick={()=>{props.onEdit(todo)}}/>
        </List> )
      
   );
}

export default TodoList;