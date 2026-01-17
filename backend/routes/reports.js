const express = require("express");
const router = express.Router();

// For hackathon demo (no DB required)
let reports = [];

// GET all reports
router.get("/", (req, res) => {
  res.json(reports);
});

// POST new report
router.post("/", (req, res) => {
  const { severity, location } = req.body;

  const newReport = {
    id: Date.now(),
    severity,
    status: "Reported",
    location
  };

  reports.unshift(newReport);
  res.status(201).json(newReport);
});

module.exports = router;
