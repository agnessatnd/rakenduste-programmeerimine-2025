const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const catsRoutes = require("./routes/cats.routes");

app.use(cors());

app.use(express.json());

app.use("/cats", catsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
