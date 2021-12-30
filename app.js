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
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Optimization code

const getAllTour = (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
}

const getTour = (req, res) => {
    const ID = req.params.id * 1;
    const tour = tours.find((ele) => ele.id === ID);
    if (!tour) {
        return res.status(404)
            .json({
                status: 'faild',
                messege: "Invalid ID"
            })
    }

    res.status(200)
        .json({
            status: 'success',
            data: {
                tours
            }
        })
}

const createPost = (req, res) => {
    //   console.log(req.body);
    const id = tours[tours.length - 1].id + 1;
    console.log(id);
    const newTour = Object.assign({ id: id }, req.body);
    console.log(newTour);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if (!err) {
            res.status(200)
                .json({
                    status: 'success',
                    data: {
                        tour: newTour
                    }
                })
        } else {
            console.log(err);
        }
    })
}

const updateTour = (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            data: '<h1>Tour updated!'
        })
}

const deleteTour = (req, res) => {
    const ID = req.params.id * 1;
    const tour = tours.find((ele) => ele.id === ID);
    if (!tour) {
        return res.status(404)
            .json({
                status: 'faild',
                messege: "Invalid ID"
            })
    }

    res.status(200)
        .json({
            status: 'success',
            data: null
        })
}
//Create get api for v1 and endpoint is tours

app.get('/api/v1/tours', getAllTour)
app.get('/api/v1/tours/:id', getTour)
app.post('/api/v1/tours', createPost)
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour)


const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})