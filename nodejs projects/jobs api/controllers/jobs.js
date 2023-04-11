const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//here we get all jobs created by current user, not jobs created by all users
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  //res.send("all jobs");
};

//jobs accessed from params obj (job id) - user located in user obj that we get from middleware
//since in auth middleware, we already passed name to req.user (tho we did need to do so), i destructured it here too by just to test how things work and see where this userId comes from compared to the jobId that comes from req.params
const getJob = async (req, res) => {
  const {
    user: { userId /*name*/ },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job /*name*/ });
  //res.send("get a  job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // automatically assigning the userId to property createdby
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
  //res.json(req.body);
  //res.json(req.user);
  //res.send("create job");
};

const updateJob = async (req, res) => {
  res.send("update jobs");
};

const deleteJob = async (req, res) => {
  res.send("delete  job ");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
