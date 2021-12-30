const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.status(200)
       .json({
        status : 1,
        massage : 'Hello from the server.'
    })
})

app.post('/',(req,res)=>{
    res.status(200)
       .json({status : 1 , massage : 'You can call this endpoint.'})
})

const port = 8080;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}.`);
})