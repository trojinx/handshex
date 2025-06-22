import jwt from "jsonwebtoken";

function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Check if token is present
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded;
    next();
  });
}

export default verifyJWT;
