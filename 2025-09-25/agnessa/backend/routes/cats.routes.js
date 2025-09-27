const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();

const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");

router.use(catsRouteMiddleware);

router.get("/", catsGetRouteMiddleware, catsController.read);

router.post(
  "/",
  body("name").isString().trim().isLength({ min: 1, max: 50 }),
  catsController.create
);

router.put(
  "/:id",
  param("id").isUUID(),
  body("name").optional().isString().trim().isLength({ min: 1, max: 50 }),
  catsController.update
);

router.delete("/:id", param("id").isUUID(), catsController.delete);

module.exports = router;
