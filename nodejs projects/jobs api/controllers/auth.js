const register = async (req, res) => {
  res.send("register use");
};
const login = async (req, res) => {
  res.send("login use");
};

module.exports = {
  register,
  login,
};
