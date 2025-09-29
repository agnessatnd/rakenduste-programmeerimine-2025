const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const auth = require("../controllers/auth.controller");
const { authRouteMiddleware } = require("../middlewares/auth.middlewares");

// POST /auth/login
router.post(
  "/login",
  body("username").isString().trim().notEmpty(),
  body("password").isString().trim().notEmpty(),
  auth.login
);

// GET /auth/ping
router.get("/ping", authRouteMiddleware, auth.ping);

module.exports = router;
