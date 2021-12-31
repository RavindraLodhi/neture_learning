//IMPORT MODULE
const express = require('express');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes');
const usersRouter = require('./routes/usersRoutes')

const app = express();

/***
 * middelware for data available in post api
 * middelware just a function that convert the incomming request data
 */

//MIDDLEWARE 
app.use(express.json());

// THIRD PARTY MIDDLE WARE
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log("Hello from comman middleware...");
    next();
})

app.use((req, res, next) => {
    req.time = new Date().toISOString();
    next();
})

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;