const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
      const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    }

    if (username === "user" && password === "password") {
      const token = jwt.sign({ username, role: "user" }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (e) {
    next(e);
  }
};

exports.ping = (req, res) => {
  res.json({
    message: "pong",
    user: req.user,
  });
};
