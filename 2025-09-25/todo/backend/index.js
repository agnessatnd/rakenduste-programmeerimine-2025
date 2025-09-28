const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const catsRoutes = require("./routes/todos.routes");

app.use(cors());

app.use(express.json());

app.use("/todos", catsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
