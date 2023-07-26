const jwt = require("jsonwebtoken");

exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "joy"); // Replace "your-secret-key" with your actual secret key
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Token has expired" });
    }

    const { id } = decoded;
    req.id = id;
    next();
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
