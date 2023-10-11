const User = require('../model/User');
const asyncHandler = require("express-async-handler")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// I have used only one token Secret in this project and without dotenv also

const TokensSec = 'ab1559ed9981de94791d4376cef134fb856069b914210965691def6593b544973c8507e177c90c038b37f699803aeae09a13fe7b7dffc62788f772a8c54f2e98'


const register = asyncHandler(async (req , res) => {

 const {name , username , password , email} = req.body;

//  If we don't get any of these stuff then server is gonna send an error

if(!name || !username || !password || !email ){
    return  res.status(400).json("All Fields Are Required!")
}


// Check For Duplicates

const exist = await User.findOne({email}).lean().exec() 

if(exist){
    return res.status(409).json("User Already Exists!")

}

// Storing The User In Db and Encrypting the password with crypto js

const newUser = new User({
     name,
     username,
     email,
     password : CryptoJS.AES.encrypt( req.body.password , TokensSec).toString()
    })
    

const savedUser = await newUser.save()
 

if(savedUser) {
    res.status(201).json(`New User ${name} Is Successfully Created`)
}else{
    return res.status(500).json(err)
}



})


const login = asyncHandler(async(req , res) => {

    const {email , password} = req.body;

//  If we don't get any of these stuff then server is gonna send an error

    if(!email || !password) {
        return res.status(400).json({message : "All Fields Are Required!"})
    }

    // To check if user exist or not

    const exist = await User.findOne({email}).lean().exec();

    if(!exist) {
        return res.status(403).json({message : "Email Is Not Registered!"})
    }


    // Decrypting Password

    const hashedPassword = CryptoJS.AES.decrypt(exist.password, TokensSec)


    const originalPassword =  hashedPassword.toString(CryptoJS.enc.Utf8)



// checking if the password matches with original password of the user or not

if(  originalPassword !== password ) {
   return res.status(401).json({message :"Incorrect Credentials"})
  }
    
   //   Creating Access and Refresh Tokens

    const accessToken = jwt.sign(
        {
            email : exist.email , 
            isAdmin : exist.isAdmin
        } , 
        TokensSec , 
        {
            expiresIn : '1h'
        }
        )


       

    const refreshToken = jwt.sign(
            {
                email : exist.email,
                isAdmin : exist.isAdmin
            } , 
           TokensSec ,
            {
                expiresIn :   '1d'
            }
        )

     // Storing RefreshToken as http only cookie 

   
    res.cookie("jwt" , refreshToken , {
            maxAge : 24 * 60 * 60 * 1000 , //cookie expires in a day
        httpOnly : true ,
        })
     

// Sending back the access token normally because its gonna change after every few minutes with the help of refresh token.

      res.json({ _id : exist._id , name : exist.name , email: exist.email , username : exist.username  , accessToken })



})


const refresh = asyncHandler(async (req , res) => {

    // Getting the  Jwt cookie of the user and checking it , if its authentic then the server will send new access token or else unauthorize user.

    const cookie = req.cookies

    if(!cookie.jwt) return res.status(401).json({message : 'Unauthorized!'})

  

    const refreshToken = cookie.jwt
    
    
    // Verifying the user refresh token
    
    jwt.verify(
        refreshToken , 
        TokensSec,
        asyncHandler(async (err , user) => {
            if(err) return res.status(403).json({message : 'Forbidden!'})

            const foundUser = await User.findOne({email : user.email})


            if(!foundUser) return res.status(401).json({message : 'Unauthorized!'})

            const accessToken = jwt.sign(
                {
                    email : foundUser.email ,
                    isAdmin : foundUser.isAdmin
                },
                TokensSec ,
                {expiresIn : '1h'}
            )

            res.json({accessToken})
        })
    )

})


const logout = asyncHandler( async(req, res) => {
    
    // Clearing the cookie of the user
    const cookies = req.cookies
    res.clearCookie('jwt' )
    res.json('cookie cleared')
} )

const authCheck = asyncHandler( async(req, res) => {
   
    res.status(201).json('Authenticated')
} )


module.exports = {register , login , refresh ,logout, authCheck}