const app = require('./app')

const port = 8080;
//SERVER STARTING
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})