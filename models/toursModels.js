const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration.']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have max Group Size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty.']
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have summary.']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have discription.']
    },
    imageCover: {
        type: String,
        required: [true, 'Atour must have image cover.']
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
},
    {
        toJSON: {virtuals : true},
        toObject: {virtuals : true}
    }
);

tourSchema.virtual('durationWeek').get(function () {
    return this.duration / 7
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;