
// I have not used dot env because of sharing

const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/corsOptions")
const app = express()




 
mongoose.connect(

    'mongodb://127.0.0.1:27017/UserStories'

    ).then(() => console.log("DB Connected")).catch((err) =>{
        
        console.log(err)
    })
    

    app.use(cors(corsOptions))
    app.use(express.json())
    app.use(cookieParser())

app.use('/auth' , require("./routes/auth"))
app.use('/notes' , require("./routes/notes"))

app.use('/home' , (req , res) => {
    res.send('server working')
})



app.listen( 5000 ,( ) =>  console.log('Backend is running!'))

