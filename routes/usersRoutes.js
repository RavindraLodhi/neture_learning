//1. MODULES
const express = require('express');

//2. MIDDELWARE
const userRouter = express.Router();
const userControllers = require('../controllers/userControllers')

//4. USER ROUTE
userRouter
    .route("/")
    .get(userControllers.getAllUser)
    .post(userControllers.createUser);
userRouter
    .route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

//5. EXPORTING MODULE
module.exports = userRouter;