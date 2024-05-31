const axios = require("axios");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // No token, unauthorized

  try {
    const response = await axios.post(
      `${process.env.AUTH_API}/user/validate`,
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
