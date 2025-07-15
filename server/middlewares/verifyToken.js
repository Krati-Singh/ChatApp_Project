import jwt from "jsonwebtoken";

const verifyToken = (request, response, next) => {
  const token = request.cookies.token || request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "No token provided" });
  }
  console.log("Cookies from client:", request.cookies);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    request.userId = decoded.userId;
    next();
  } catch (err) {
    return response.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
