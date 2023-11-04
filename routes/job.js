const express = require('express');
const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob,getStatus } = require('../controllers/job');

router.route('/').post(createJob).get(getAllJobs);
router.route('/status-options').get(getStatus);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);




module.exports = router