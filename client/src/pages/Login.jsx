import React, { useEffect, useState } from 'react'
import '../css/login.css'
import loginUser from '../loginUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
 



    const navigate = useNavigate()

    // Intializing dispatch
    const dispatch = useDispatch();

    //getting user from dispatch so we can navigate the user to home page

    const user = useSelector(state => state?.user?.currentUser )

    // Getting isFetching and error from redux to stop user from spamming login or show the error

    const {isFetching , error} = useSelector(state => state?.user)


    const signIn = (e) => {
      e.preventDefault()
      // Sending dispatch and user details to login User
      loginUser(dispatch , {email , password})

      
    }
    
    
    // To not let user go to login page ,once logged in 
    useEffect(()=> {

      if(user){
        navigate('/')
      }
    }, [user])

  return (
    <div className='register'> 
      
    <form className='register-input'>
      <h2>Sign In</h2>
      <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
      {error && <span>Incorrect Email Or Password!</span>}
  
     <button onClick={signIn} disabled= {!email || password.length < 3 || isFetching }>Submit</button>


    </form>
  </div>
  )
}

export default Login
