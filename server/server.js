require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Registration API is running...");
});

const PORT = process.env.PORT || 5000;
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

app.get("/api/students", (req, res) => {
  res.json({ message: "Students route works!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
