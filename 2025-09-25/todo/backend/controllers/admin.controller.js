const { validationResult } = require("express-validator");
const todosController = require("./todos.controller");

exports.readAll = (req, res, next) => {
  try {
    const all = todosController.getAll();
    res.json(all);
  } catch (e) {
    next(e);
  }
};

exports.toggle = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const todo = todosController.toggle(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });

    res.json(todo);
  } catch (e) {
    next(e);
  }
};
