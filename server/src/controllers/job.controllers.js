const Job = require('../models/job.model')
const User = require('../models/user.model')
const CategoriesJobs = require('../models/categoriesJobs.model')
const TypesJobs = require('../models/typesJobs.model')
const { NotFoundError, ForbiddenError } = require('../errors/Errors')
const { getUserRoleById } = require('../services/user.service')
const { USER_ROLE } = require('../constants/user.constants')

exports.createJob = async (req, res, next) => {
  //     try {
  //         const user = await User.findById(req.user._id);
  //         if (!user) {
  //             throw new NotFoundError("User not found");
  //         }
  //         const role = await getUserRoleById(user._id);
  //         if (role!== USER_ROLE.ADMIN) {
  //             throw new ForbiddenError("You are not authorized to perform this action");
  //         }
  //         const job = new Job(req.body);
  //         const savedJob = await job.save();
  //         res.status(201).json(savedJob);
  //     } catch (error) {
  //         res.status(400).json({ message: error.message });
  //     }
  // };

  // const fetcherRole = await getUserRoleById(req.user.userId);
  // const isEmployer = fetcherRole.role === USER_ROLE.employer;

  const job = await Job.create(req.body)
  res.status(201).json(job)
}

// TODO: Admin and Employee Route
exports.createCategory = async (req, res, next) => {
  try {
    const Category = await CategoriesJobs.create(req.body)
    res.status(201).json(Category)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// TODO: Admin and Employee Route
exports.createType = async (req, res, next) => {
  const Type = await TypesJobs.create(req.body)
  res.status(201).json(Type)
}

exports.getAllJobs = getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(['category', 'type', 'createdJob'])
    res.status(200).json(jobs)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getJobById = async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate([
    'category',
    'type',
    'createdJob',
  ])
  if (!job) return next(new NotFoundError('Job not found'))
  res.status(200).json(job)
}

exports.updateJob = async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
  )
  res.status(200).json({ msg: 'Job updated successfully', newData: job })
}

exports.deleteJob = async (req, res, next) => {
  await Job.findByIdAndDelete(req.params.id)
  res.status(200).json('Job deleted successfully')
}

// Get All Jobs For Employer By ID Employer
exports.getAllJobsByIdEmployer = async (req, res, next) => {
  const jobsForEmployerById = await Job.find({
    createdJob: req.user.userId,
  }).populate(['category', 'type', 'createdJob'])
  res.status(200).json(jobsForEmployerById)
}
