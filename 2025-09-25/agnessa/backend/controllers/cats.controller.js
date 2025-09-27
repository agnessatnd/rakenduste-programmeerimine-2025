const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    archived: false,
    archivedAt: null,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: 1727098952739,
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

    const { name } = req.body;
    const cat = {
      id: uuid(),
      name,
      createdAt: Date.now(),
      updatedAt: null,
      archived: false,
      archivedAt: null,
    };
    cats.push(cat);
    return res.status(201).json(cat);
  } catch (e) {
    next(e);
  }
};

exports.read = (_req, res, next) => {
  try {
    const visible = cats.filter((c) => !c.archived);
    return res.json(visible);
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
    const idx = cats.findIndex((c) => c.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    const { name } = req.body;
    if (typeof name === "string") cats[idx].name = name;
    cats[idx].updatedAt = Date.now();

    return res.json(cats[idx]);
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
    const idx = cats.findIndex((c) => c.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    cats[idx].archived = true;
    cats[idx].archivedAt = Date.now();
    cats[idx].updatedAt = Date.now();

    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
