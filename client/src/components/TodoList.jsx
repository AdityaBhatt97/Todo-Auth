import { faPenToSquare, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const TodoList = ({ todos, setTodos , getTodo }) => {
  const userId = 23242;
  console.log(todos);

  // Deleting Todo by taking the id
  const deleteTodo = async (id) => {
    const res = await axios.delete(`http://localhost:5000/notes/delete/${id}`);

    getTodo()

    console.log(res);
  };

  // Sending a patch request to change only completed 
  const completed = async(id) => {

    const res = await axios.patch(`http://localhost:5000/notes/complete/${id}`)
    console.log(res)
    getTodo()
       
  } 
  return (
    <div className="todoList">
      {todos.length > 0 ? (
        todos.map((items) => (
         
            <div className="todos" key={items?._id}>
              <div className="todos-title">
                <span onClick={() => completed(items?._id)}>{items?.completed ?  <FontAwesomeIcon icon={faSquareCheck} style={{color : 'black'}} /> : <FontAwesomeIcon icon={faSquareCheck} /> }</span>
                <h3>{items?.title}</h3>
                <div>
                  <button onClick={() => deleteTodo(items?._id)}><FontAwesomeIcon icon={faTrash} /></button>
                  <Link to={`/update/${items?._id}`}>
                    <button><FontAwesomeIcon icon={faPenToSquare} /></button>
                  </Link>
                </div>
              </div>
              <p>{items?.desc}</p>
            </div>
          
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default TodoList;
