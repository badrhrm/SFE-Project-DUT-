const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//here we get all jobs created by current user, not jobs created by all users
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  //res.send("all jobs");
};

const getJob = async (req, res) => {
  res.send("get a  job");
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
