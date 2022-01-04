//1. IMPORT MODULE
const express = require('express');
const tourControllers = require('../controllers/tourControllers')
//2. MIDDLEWARE
const tourRouter = express.Router();

//3. getting parms

// tourRouter.param('id', tourControllers.checkID);

//5. TOUR ROUTE 
//Cheap route

tourRouter
     .route('/get-tour-status')
     .get(tourControllers.getTourstatus)
tourRouter

tourRouter
     .route('/get-monthaly-plan/:year')
     .get(tourControllers.getMonthalyPlan)
tourRouter

tourRouter
     .route('/top-5-cheap')
     .get(tourControllers.aliasTopTour,tourControllers.getAllTour)
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