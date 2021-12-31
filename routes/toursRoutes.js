//1. IMPORT MODULE
const express = require('express');
const tourControllers = require('../controllers/tourControllers')
//2. MIDDLEWARE
const tourRouter = express.Router();

//5. TOUR ROUTE 
tourRouter
    .route('/')
    .get(tourControllers.getAllTour)
    .post(tourControllers.createPost);
tourRouter
    .route('/:id')
    .get(tourControllers.getTour)
    .patch(tourControllers.updateTour)
    .delete(tourControllers.deleteTour);

//6. EXPORTING MODULE
module.exports = tourRouter;