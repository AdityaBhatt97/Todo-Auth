import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/home.css";
import axios from "axios";
import TodoList from "../components/TodoList";
import "../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import refreshApi, { status } from "../refreshApi";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");
  console.log(desc, title);

  // Getting user from redux

  const user = useSelector((state) => state?.user?.currentUser);

  //   Accessing the token and using it in the header

  let token = user?.accessToken;
  const tokenUserRequest = axios.create({
    headers: { token: `Bearer ${token}` },
  });

  const dispatch = useDispatch();

  // Checking if the user is authenticated or not , if user is not authenticated then we are gonna call the refresh Api function

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await tokenUserRequest.get(
          "http://localhost:5000/auth/check"
        );
      } catch (err) {
        if (err.response.status === 403) {
          refreshApi(dispatch);
        }
      }
    };

    token && authCheck();
  }, [token]);

  // Checking for userId in users localstorage , if it doesn't exist then creating one with random number, so that we can use this userId (no auth) for fetching the data
  // If the user is authenticated then we will get it through redux

  useEffect(() => {
    const Id = user?._id || JSON.parse(localStorage.getItem("userId"));

    if (Id) {

      setUserId(Id);

    } else {

      let decimal = Math.random();

      localStorage.setItem(
        "userId",
        JSON.stringify(Math.floor(decimal * 1000))
      );
    }

  }, []);

  const getTodo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/notes/find/${userId}`);

      setTodos(res?.data.reverse());
      
    } catch (err) {
      console.log(err);
    }
  };

  // Fetching the todo and putting it into state variable after getting the userId
  useEffect(() => {
    userId && getTodo();
  }, [userId]);



  // Adding to do

  const addTodo = async () => {
    try {
      const res = await axios.post("http://localhost:5000/notes/add", {
        userId,
        title,
        desc,
      });

      // if the response status code is 201 then we will just push that object  so that we won't have to reload

      if (res.status === 201) {
        // setTodos(prev => [ {userId, title , desc},...prev])
        getTodo();
        setTitle("");
        setDesc("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="bg"></div>

      <Navbar />
      <div className="add-todo">
        <div className="todo-input">
          <h2>Add Todo</h2>
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h3>Description</h3>

          <textarea
            rows={5}
            cols={55}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button onClick={addTodo} className="btn">Add</button>
        </div>
      </div>

      {todos.length > 0 && <TodoList todos={todos} setTodos={setTodos}  getTodo= {getTodo}/>}
    </div>
  );
};

export default Home;
