const express = require('express')
const itemsRouter = express.Router()

const itemsController = require('../controllers/itemsController')

itemsRouter.get('/getitem',itemsController.getItems)
itemsRouter.post('/createitem',itemsController.createItem)
itemsRouter.delete('/delitem/:id',itemsController.deleteItem)
itemsRouter.put('/updateitem/:id',itemsController.updateItem)
itemsRouter.put('/checkitem/:id',itemsController.checkItem)

module.exports =itemsRouter;