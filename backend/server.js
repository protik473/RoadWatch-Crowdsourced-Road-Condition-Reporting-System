const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/roadwatch")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

