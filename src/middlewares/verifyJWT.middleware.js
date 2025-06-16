import jwt from "jsonwebtoken";

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if token is present
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded; // { id: ... } from jwt.sign payload
    next(); // move to next middleware / route handler
  });
}

export default verifyJWT;
