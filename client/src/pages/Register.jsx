import React, { useEffect, useState } from 'react'
import '../css/register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Register = () => {

    const [name , setName] = useState('')
    const [username , setUsername] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const user = useSelector(state => state.user?.currentUser)

    useEffect(()=> {

      if(user){
        navigate('/')
      }
    }, [user])

 const navigate = useNavigate()
    console.log(name , username , email, password)

    const submit = async(e) => {
        e.preventDefault()
        try{

            const res = await axios.post('http://localhost:5000/auth/register', {name , username, email, password})
          
            if(res.status === 201){
                navigate('/login')
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='register'> 
      
    <form className='register-input'>
      <h2>Sign Up</h2>
      <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
      <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
      <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
     <button onClick={submit} disabled={!name || !username || !email || password.length < 6 } >Submit</button>
    </form>
    </div>
  )
}

export default Register
