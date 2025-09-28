const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const todos = require("../controllers/todos.controller");

const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
} = require("../middlewares/todos.middlewares");

router.use(todosRouteMiddleware);

// GET /todos
router.get("/", todosGetRouteMiddleware, todos.read);

// POST /todos
router.post(
  "/",
  body("title").isString().trim().isLength({ min: 1, max: 120 }),
  todos.create
);

// PUT /todos/:id
router.put(
  "/:id",
  param("id").isUUID(),
  body("title").optional().isString().trim().isLength({ min: 1, max: 120 }),
  todos.update
);

// DELETE /todos/:id
router.delete("/:id", param("id").isUUID(), todos.delete);

module.exports = router;
