const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/items", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const item = { id, name };
  items.push(item);
  res.status(201).json(item);
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "not found" });
  res.json(item);
});

app.put("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return res.status(404).json({ error: "not found" });
  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }
  items[idx] = { ...items[idx], name };
  res.json(items[idx]);
});

app.delete("/api/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = items.length;
  items = items.filter((i) => i.id !== id);
  if (items.length === before)
    return res.status(404).json({ error: "not found" });
  res.status(204).send();
});

// Route parameters
app.get("/users/:userId/books/:bookId", (req, res) => {
  const { userId, bookId } = req.params;
  res.json({ userId, bookId });
});

app.get("/flights/:from-:to", (req, res) => {
  const { from, to } = req.params;
  res.json({ from, to });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
