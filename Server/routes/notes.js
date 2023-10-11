const express = require('express')
const router = express.Router()
const notesController = require('../controller/notesController')


router.route('/add').post( notesController.addTodo)
router.route('/find/:_id').get(  notesController.getTodo)
router.route('/update/:_id').put(notesController.updateTodo)
router.route('/delete/:_id').delete(notesController.deleteTodo)
router.route('/todo/:_id').get(notesController.singleTodo)
router.route('/complete/:_id').patch(notesController.isComplete)

module.exports = router



