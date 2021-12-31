//MODULES
const fs = require('fs')

//2. DATA BASE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

//3. ROUTER HANDLER
exports.getAllTour = (req, res) => {
    res.status(200)
        .json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
}

exports.getTour = (req, res) => {
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

exports.createPost = (req, res) => {
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

exports.updateTour = (req, res) => {
    console.log(req.time);
    res.status(200)
        .json({
            status: 'success',
            data: '<h1>Tour updated!'
        })
}

exports.deleteTour = (req, res) => {
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