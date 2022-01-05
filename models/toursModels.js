const mongoose = require('mongoose');
const slugify = require('slugify')
const validator = require('validator')
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim : true,
        maxlength : [40, 'A tour length should not be less then 40'],
        minlength : [10, 'A tour length should not be less then 10'],
        // validate : [ validator.isAlpha,'Tour name should be charactor only']
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
        required: [true, 'A tour must have difficulty.'],
        enum : {
          values :  ['easy','medium','difficult'],
          message : 'Difficulty either easy, medium or difficult'
        }
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
        default: 4.5,
        max : [5, 'A tour length should not be less then 5'],
        min : [2, 'A tour length should not be less then 2'],
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: {
        type: Number,
        validate : {
            validator : function(val){
                console.log(val);
                console.log(this.priceDiscount);
                // THIS WILL WORK ONLY WHEN WE ADD NEW TOUR
                return val < this.price;
            },
            message : 'Discount price should be ({VALUE}) less then price'
        }
       
    },
    slug : {
        type : String
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

//MongoDB middelware

//DOCUMENT MIDDLEWARE

// this will work only save and create not for update
tourSchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower: true})
    next();
})

tourSchema.post('save',function(doc,next){
    next();
})

//QUARY MIDDLEWARE

tourSchema.pre(/^find/,function(next){
    console.log("running pre for quary params........................");
    this.find({maxGroupSize: {$ne : 12}})
     next();
})

tourSchema.post(/^find/,function(docs,next){
    console.log("running post  for pos params........................");
     next();
})

//AGGREGATION MIDDELWARE

tourSchema.pre('aggregate',function(next){
   this.pipeline().unshift({$match : {maxGroupSize: {$ne : 12}}})
   //.unshift({maxGroupSize: {$ne : 12}});
     next();
})

tourSchema.post('aggregate',function(docs,next){
    console.log(`Aggregation ${this}`);
     next();
})




const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;