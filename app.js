//core module should import top 
const fs = require('fs')
const express = require('express');
const res = require('express/lib/response');

const app = express();

/***
 * middelware for data available in post api
 * middelware just a function that convert the incomming request data
 */
 
app.use(express.json());


// app.get('/',(req,res) => {
//     res.status(200)
//        .json({
//         status : 1,
//         massage : 'Hello from the server.'
//     })
// })

// app.post('/',(req,res)=>{
//     res.status(200)
//        .json({status : 1 , massage : 'You can call this endpoint.'})
// })

//Read the data asynchronus

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Create get api for v1 and endpoint is tours

app.get('/api/v1/tours',(req,res) =>{
    res.status(200)
       .json({
           status : 'success',
           results : tours.length,
           data :{
               tours
           }
       })
})

//Create post api for v1 and endpoint is tours to make data available in post the we have to use middelware

app.post('/api/v1/tours',(req,res) => {
//   console.log(req.body);
 const id = tours[tours.length - 1].id + 1;
 console.log(id);
 const newTour = Object.assign({id:id},req.body);
 console.log(newTour);
 tours.push(newTour);
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours),err =>{
     if(!err){
         res.status(200)
            .json({
                status : 'success',
                data : {
                    tour : newTour
                }
            })
     }else{
         console.log(err);
     }
 })
})

const port = 8080;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}.`);
})