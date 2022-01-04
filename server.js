const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB, {}).then(con => {
    console.log("DB connection successfully.........");
})

const port = process.env.PORT || 8080;

//SERVER STARTING
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})