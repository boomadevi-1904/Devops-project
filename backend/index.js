const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/tasks", (req, res) => {
  res.json(["Task 1", "Task 2", "Deploy App 🚀"]);
});

app.listen(3001, () => console.log("Backend running"));