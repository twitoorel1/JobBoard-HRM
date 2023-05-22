const router = require('express').Router()
const jobController = require('../controllers/job.controllers')
const catchAsyncError = require('../errors/catchAsyncError')
const { authJwtRoleTest } = require('../middlewares/authentication.middleware')

router.post('/', catchAsyncError(jobController.createJob))
router.post('/category', catchAsyncError(jobController.createCategory))
router.post('/type', catchAsyncError(jobController.createType))

router.get('/getAll', catchAsyncError(jobController.getAllJobs))

router.get('/find/:id', catchAsyncError(jobController.getJobById))
router.put('/update/:id', catchAsyncError(jobController.updateJob))
router.delete('/delete/:id', catchAsyncError(jobController.deleteJob))

// Get All Jobs For Employer By ID Employer
router.get(
  '/findByIdEmployer',
  authJwtRoleTest('employer'),
  catchAsyncError(jobController.getAllJobsByIdEmployer),
)

// Route For Employee and Employer
// Route For Employee (example: Galit Working in Boeing HRM)
// Route For Employer (example: Nirlat)

module.exports = router
