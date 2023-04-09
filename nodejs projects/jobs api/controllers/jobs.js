const getAllJobs = async (req, res) => {
  res.send("all jobs");
};
const getJob = async (req, res) => {
  res.send("get a  job");
};
const createJob = async (req, res) => {
  res.send("create job");
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
