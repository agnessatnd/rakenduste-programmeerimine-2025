const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const todos = [
  {
    id: uuid(),
    title: "First TODO",
    createdAt: Date.now(),
    updatedAt: null,
    archived: false,
    archivedAt: null,
  },
];

exports.create = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title } = req.body;
    const todo = {
      id: uuid(),
      title,
      createdAt: Date.now(),
      updatedAt: null,
      archived: false,
      archivedAt: null,
    };
    todos.push(todo);
    return res.status(201).json(todo);
  } catch (e) {
    next(e);
  }
};

exports.read = (req, res, next) => {
  try {
    res.json(todos.filter((t) => !t.archived));
  } catch (e) {
    next(e);
  }
};

exports.update = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    const { title } = req.body;
    if (typeof title === "string") todos[idx].title = title;
    todos[idx].updatedAt = Date.now();
    res.json(todos[idx]);
  } catch (e) {
    next(e);
  }
};

exports.delete = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    todos[idx].archived = true;
    todos[idx].archivedAt = Date.now();
    todos[idx].updatedAt = Date.now();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

exports.getAll = () => {
  return todos;
};

exports.toggle = (id) => {
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  todos[idx].archived = !todos[idx].archived;
  todos[idx].updatedAt = Date.now();
  todos[idx].archivedAt = todos[idx].archived ? Date.now() : null;
  return todos[idx];
};
