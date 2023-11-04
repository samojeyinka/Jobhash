const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFound, BadRequest } = require('../errors')

//GET ALL JOBS 
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');//SORT BY CREATION TIME
   if(jobs.length === 0){
    res.status(StatusCodes.OK).send(`No job created yet  by ${req.user.username}`);
   }
    res.status(StatusCodes.OK).json({ jobs, nbHits: jobs.length });
}

//GET SINGLE JOB 
const getJob = async (req, res) => {
    //GET THE USERID AND JOB ID
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFound(`No job found with the id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job });
}


//CREATE JOB 
const createJob = async (req, res) => {
    //ASSIGNED THE USER  ID TO CREATEDBY MODEL OPTION
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
}

//UPDATE  JOB 
const updateJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
        body: { company, position }
    } = req;


    if (company === '' || position === '') {
        throw new BadRequest('Provide company name and position')
    }
    const job = await Job.findByIdAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new NotFound(`No job found with the id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job });
}

//UPDATE  JOB 
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });

    if (!job) {
        throw new NotFound(`No job found with the id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job });
}

const getStatus = async (req, res) => {
    try {
      const distinctStatusValues = await Job.distinct('status');
      res.json(distinctStatusValues);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch status options' });
    }
  };

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    getStatus

}