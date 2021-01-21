const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  // const token = req.header("auth-token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBTbWl0aCIsImlkIjoiNjAwOTIyMGVhNzU4MDgzMjZjMzBmOTE5IiwiaWF0IjoxNjExMjM3MjkwfQ.xz1hJI88tGR0quEp386ZQTQTT0IP63rBk2a6CODVY4s";

  if (!token) return res.status(401).json({ error: "Access denied" });  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token invalid" });
  }
};
module.exports = verifyToken;