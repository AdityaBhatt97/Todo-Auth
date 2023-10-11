import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import refreshApi from '../refreshApi'

const Update = () => {

    // Making multiple states 
    const [title , setTitle] = useState('')
    const [desc , setDesc] = useState('')
    const [data , setData] = useState({})

    const [userId , setUserId] = useState('')


  const user = useSelector(state => state?.user?.currentUser)



  //   Accessing the token and using in the header
    let token  = user?.accessToken
    const tokenUserRequest = axios.create({
      headers: { token: `Bearer ${token}`}
    })
  
  
   
  
    const dispatch = useDispatch()
    
    // Checking if the user is authenticated or not , if user is not authenticated then we are gonna call the refresh Api function 

    useEffect(() => {
      
      const authCheck = async() => {
        try{
  
          const res = await tokenUserRequest.get('http://localhost:5000/auth/check')
        }catch(err){
          if(err.response.status === 403){
         refreshApi(dispatch )
          }
  
        }
        
  
  
      }
  
     token && authCheck()
      
      
    }, [token])

    // Checking for userId in users localstorage , if it doesn't exist then creating one with random number, so that we can use this userId (no auth) for fetching the data 
    
    useEffect(() => {
   
      const Id =  user?._id || JSON.parse(localStorage.getItem('userId')) 

        if(Id){
            setUserId(Id)
        }else{
            let decimal = Math.random()
            localStorage.setItem('userId', JSON.stringify(Math.floor(decimal * 1000)))
        }
    }, [])


    // Getting the location hook to access the params
    const location = useLocation()
    const path = location.pathname.split('/')[2] 
    
    // Getting navigate hook
    const navigate = useNavigate()

    // Fetching the todo item 
    useEffect(() => {

        const getData = async() => {
            const res = await axios.get(`http://localhost:5000/notes/todo/${path}`)
              console.log(res)
              setDesc(res?.data?.desc)
              setTitle(res?.data?.title)
              setData(res?.data)
        }
        getData()

    }, [])
    
    // console.log(data)
    // Updating the todo
    const updateTodo = async(e) => {
      e.preventDefault()
        const res = await axios.put(`http://localhost:5000/notes/update/${path}`, {userId  , title , desc})
        // Navigating user back to home after getting 201
       
      if(res?.status === 200){
          navigate('/')

      }
    } 
  return (
    <div className='home'>
        <Navbar/>
      <div className='bg'></div>
      
      <div className='add-todo'>
      <div className='todo-input'>

        <h2>Update Todo</h2>
        <h3>Title</h3>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <h3>Description</h3>
      
        <textarea rows={5} cols={55} value={desc}  onChange={(e) => setDesc(e.target.value)}></textarea >
      <button onClick={updateTodo} className='btn'>Update</button>

      </div>
      </div>
      
    </div>
  )
}

export default Update
