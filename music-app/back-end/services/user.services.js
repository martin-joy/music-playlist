const User = require("../models/User");
const jwt = require("jsonwebtoken");

//create user for login

exports.createUser = async (req, res) => {
  console.log("User create hit");
  const { name, email, password } = req.query;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(500).send({
        message: "Email already in use. Please use a different email address!",
      });
    }
    await User.create({
      name,
      email,
      password,
    });
    return res.send({ message: "User added successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({ message: "Error creating user." });
  }
};

//validate the user form login and generate the token for that particular user login

exports.validationUser = async (req, res) => {
  console.log("user validation hit");
  const { email, password } = req.query;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      if (existingUser.password === password) {
        const token = jwt.sign({ id: existingUser.id, name: existingUser.name }, "joy", { expiresIn: "1h" });
        return res.send({ message: "User validation successful!", token,existingUser});
      } else {
        return res.status(500).send({ message: "Invalid password." });
      }
    } else {
      return res.status(500).send({ message: "User not found." });
    }
  } catch (error) {
    console.log("Error in user validation:", error);
    return res.status(500).send({ message: "Error in user validation." });
  }
};

