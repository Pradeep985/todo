const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // ✅ Get token from headers

  console.log("Received Token:", token); // 🔍 Debugging log

  if (!token) {
    return res.status(401).json({ error: "No token provided, authorization denied" });
  }
  console.log("Received:", token);
  try {
    const decoded = jwt.verify(token.split(" ")[1], "your_secret_key"); // ✅ Verify token
    console.log("Decoded User:", decoded); // 🔍 Debugging log

    req.user = decoded; // ✅ Set user in request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
