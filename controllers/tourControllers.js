//MODULES
const { group } = require('console');
const fs = require('fs')
const Tour = require('../models/toursModels')
const APIFeaturs = require('../utils/APIFeturs')
//2. DATA BASE
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


//3. ROUTER HANDLER

exports.aliasTopTour = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = 'price'
    req.query.fields = '_id,name,duration,difficulty,price'
    next();
}

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    next();
}

exports.getAllTour = async (req, res) => {
    try {
        //EXECUTE QUARY
        console.log(req.query);
        const featurs = new APIFeaturs(Tour.find(), req.query)
            .filter()
            .sort()
            .limit()
            .pagination()
        const tours = await featurs.query;
        // const tours = await Tour.find({});
        res.status(200)
            .json({
                status: 'success',
                results: tours.length,
                data: {
                    tours
                }
            })
    } catch (error) {
        res.status(404)
            .json({
                status: 'record found',
                messege: error
            })
    }

}

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200)
            .json({
                status: 'success',
                data: {
                    tour
                }
            })

    } catch (error) {
        res.status(404)
            .json({
                status: 'record found',
                messege: error
            })
    }
}

exports.createPost = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        console.log(newTour);
        res.status(200)
            .json({
                status: 'success',
                data: {
                    tour: newTour
                }
            })

    } catch (error) {
        res.status(400)
            .json({
                status: 'Error',
                message: error

            })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200)
            .json({
                status: 'success',
                data: tour
            })

    } catch (error) {
        res.status(400)
            .json({
                status: 'Error',
                message: error
            });
    }
}

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200)
            .json({
                status: 'success',
                data: tour
            })
    } catch (error) {
        res.status(404)
            .json({
                status: 'faild',
                messege: "Invalid ID"
            })
    }
}

exports.getTourstatus = async (req, res) => {
    try {
        const tours = await Tour.aggregate([
            {
                $match: { ratingAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingQuantity' },
                    avgRatings: { $avg: '$ratingAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ])

        res.status(200)
            .json({
                status: 'success',
                noOfTour: tours.length,
                data: {
                    slots: tours
                }
            });
    } catch (error) {
        res.status(404)
            .json({
                status: 'faild',
                messege: error
            });
    }
}

exports.getMonthalyPlan = async (req, res) => {
    try {
        console.log(req.params);
        const year = req.params.year * 1;
        console.log(year);
        const plans = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours : {$push : '$name'}
                }
            },
            {
                $addFields : {month : '$_id'}
            },
            {
                $project : {
                    _id : 0
                }

            },
            {
                $sort : {
                    month : 1
                }
            }
        ])

        res.status(200)
            .json({
                status: 'success',
                noOfTour: plans.length,
                data: {
                    plans
                }
            });

    } catch (error) {
        res.status(404)
            .json({
                status: 'faild',
                messege: error
            });
    }
}