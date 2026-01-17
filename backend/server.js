const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportRoutes);

// MongoDB (optional for hackathon – can comment if needed)
mongoose
  .connect("mongodb://127.0.0.1:27017/roadwatch")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
