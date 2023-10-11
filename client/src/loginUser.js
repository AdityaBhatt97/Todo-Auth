import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./Redux/UserRedux";

const loginUser = async (dispatch , user) => {

// at start we are gonna change the fetching to true 
    dispatch(loginStart());

    // If login successfull then we are gonna save it in local storage and dispatch it to our redux
    try{
        axios.defaults.withCredentials = true;
        const res = await axios.post('http://localhost:5000/auth/login' , user)
        if(res.status === 200) {
            localStorage.setItem('user' , JSON.stringify( res?.data))
            dispatch(loginSuccess(res?.data))
            console.log(res)
        }

    }catch{
        dispatch(loginFailure())
    }
}

export default loginUser