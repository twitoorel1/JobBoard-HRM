const { Schema, model } = require('mongoose');

const TypesJobs = new Schema({
    title: {
        type: String,
        required: true
    }
})


module.exports = model('Types', TypesJobs);;