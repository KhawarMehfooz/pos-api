const axios = require("axios");

const authenticateToken = async (req, res, next) => {
  const publicPaths = ['/register', '/login'];
  if (publicPaths.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const response = await axios.post(
      `${process.env.AUTH_API}/users/validate`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      req.user = response.data;
      next();
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return res.sendStatus(500);
  }
};
module.exports = { authenticateToken };
