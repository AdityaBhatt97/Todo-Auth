const Notes = require('../model/Notes')
const asyncHandler = require("express-async-handler")


const addTodo = asyncHandler(async(req , res) => {

    const {userId , title , desc} = req.body;


//  If we don't get any of these stuff then server is gonna send an error

    if(!userId || !title || !desc){
        return res.status(400).json('All fields Are Required!')
    }

    // We are gonna store in in db

    const userNote = new Notes(req.body)


    const savedNotes = await userNote.save()

    if(savedNotes){
        res.status(201).json('Todo Saved!')
    }else{
        res.status(403).json(err)
    }



})


const getTodo = asyncHandler(async(req, res) => {

    // Getting the todo from db and send all the todos of the user to client side
    const userNotes = await Notes.find({userId: req.params._id});

    if(!userNotes){
        res.status(404).json('UserNotes not found!')
    }

    if(userNotes){
        res.status(201).json(userNotes)
    }else{
        res.status(403).json(err)
    }

})

const updateTodo = asyncHandler(async(req , res) => {

    const {userId , title , desc } = req.body

    
    if(!userId , !title , !desc ) {
     return res.status(400).json('All Fields Are Required!')
    }

    // Updating the todo with their Id
    
    const updatedTodo = await Notes.findByIdAndUpdate(req.params._id , {
        $set : req.body
    }, {new : true})
    
    if(updateTodo) {
        return res.status(200).json('Todo Updated!')
    }else{
        return res.status(403).json(err)
    }
    
})

const deleteTodo = asyncHandler(async ( req , res) => {
    
    // Deleting the todo with their Id

    const deleteTodo = await Notes.findByIdAndDelete(req.params._id)

    if(deleteTodo){
        return res.status(200).json(`Todo has been deleted`)
    }else{
        return res.status(500).json(err)
    }
})

const singleTodo = asyncHandler(async(req , res) => {
    

    // Sending only one todo of the user where it is needed.
    
    const todo = await Notes.findById(req.params._id)

    if(todo){
       return    res.status(201).json(todo)
    }else{
       return  res.status(500).json(err)
    }

})

const isComplete = asyncHandler(async(req , res) => {
    

    // changing only completed todo of the user.
    
    const todo = await Notes.findById(req.params._id)

    if(todo){
   await   Notes.findByIdAndUpdate(req.params._id , {
        completed : !todo.completed
      })
      res.status(201).json('Todo Complete changed')
    }else{
       return  res.status(500).json(err)
    }

})

module.exports = {addTodo , getTodo , updateTodo ,deleteTodo , singleTodo , isComplete}
