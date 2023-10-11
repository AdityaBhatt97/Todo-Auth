import axios from "axios";

import { logout, newToken } from "./Redux/UserRedux";



const refreshApi = async(dispatch) => {

  // Getting user token from local storage
    let user = JSON.parse(localStorage.getItem('user'));
    let token = user?.token

    // storing it in header
    const tokenUserRequest = axios.create({
      headers: { token: `Bearer ${token}`}
    })
   

    try{
      // Making the requrest
        axios.defaults.withCredentials = true

        const res = await axios.get('http://localhost:5000/auth/refresh')

        // If its successfull then replacing the token 
        
        if(res.status === 200){
          const {accessToken} = res?.data
       dispatch(newToken(accessToken))
        window.location.reload()
     }
      
    }catch(err){
     
      // If its not then we will logout the user and send them to the login page

       axios.defaults.withCredentials = true
            const res = await axios.post('http://localhost:5000/auth/logout')

            if(res.status === 200){

                
                logout();
                localStorage.removeItem("user");
                window.location.reload();
                
                location.href = 'http://localhost:3000/login'
            }
        
     
    }
}

export default refreshApi