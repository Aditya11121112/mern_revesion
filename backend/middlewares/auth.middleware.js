import jwt from "jsonwebtoken";

const auth_middleware = async (req, res, next) => {
  const token = await req.cookies.access_token;

  if (token == "") {
    res.status(401).json({
      message: "Token is not provided ",
      resp: "",
    });
  }

  jwt.verify(token, "adi", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // If the token is valid, attach the decoded info to the request
    req.user = decoded;
    next();
  });

  try {
  } catch (error) {
    res.status(500).json({
      message: "Error in auth middleware",
      resp: error.message,
    });
  }
};

export default auth_middleware;
