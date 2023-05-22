const { Schema, model } = require('mongoose');

const Location = new Schema({
    city: { type: String, required: false },
    street: { type: String, required: false },
})

const Salary = new Schema({
    price: { type: Number, required: false },
    type: { type: String, required: false }
})

const jobSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories",
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Types'
    },
    location: Location,
    salary: Salary,
    description: {
        type: String,
        required: false
    },
    createdJob: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = model('Job', jobSchema);