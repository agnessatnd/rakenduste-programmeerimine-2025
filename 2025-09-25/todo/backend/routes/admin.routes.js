const express = require("express");
const { param } = require("express-validator");
const { adminRouteMiddleware } = require("../middlewares/admin.middlewares");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.use(adminRouteMiddleware);

router.get("/todos", admin.readArchived);

router.patch("/todos/:id/toggle", param("id").isUUID(), admin.toggle);

module.exports = router;
