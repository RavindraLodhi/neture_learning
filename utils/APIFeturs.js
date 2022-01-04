
class APIFeaturs {
    constructor(query, queryStr) {
        this.query = query;
        this.queryString = queryStr;
    }

    filter() {
        //1.A FILTERING 
        const quaryObj = { ...this.queryString };
        const excludeFilds = ['page', 'sort', 'limit', 'field'];
        excludeFilds.forEach(ele => delete quaryObj[ele]);

        //1.B ADVANCED FILTERING
        let queryStr = JSON.stringify(quaryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        this.query.find(JSON.parse(queryStr));

        return this;
        // let query  =  Tour.find(JSON.parse(queryStr)); 
    }

    sort() {
        if (this.queryString.sort) {
            let sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    limit(){
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    pagination(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip)
            .limit(limit);

      return this;
    }

}

module.exports = APIFeaturs;