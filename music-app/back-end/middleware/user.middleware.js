exports.validateEmail = async (req, res, next) => {
  const { email } = req.query;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return res.status(400).send({ message: 'Invalid email format' });
  }
  return next();
};


exports.validatePassword = async (req, res, next) => {
  const { password } = req.query;
  const pattern= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
  if (!pattern.test(password)) {
    return res.status(400).send({ message: 'Invalid password' });
  }
  return next();
};
