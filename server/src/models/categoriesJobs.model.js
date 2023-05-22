const { Schema, model } = require('mongoose');

const CategoriesJobs = new Schema({
    title: {
        type: String,
        required: true
    }
})


module.exports = model('Categories', CategoriesJobs);;