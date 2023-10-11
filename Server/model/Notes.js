const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema(
    {
     userId : {type: String , require : true},
     title : {type : String , require: true},
     desc : {type: String},
     completed:  {type: Boolean , require: true , default: false}

    }, {timestamps : true}
)

module.exports = mongoose.model('Notes' , NotesSchema)