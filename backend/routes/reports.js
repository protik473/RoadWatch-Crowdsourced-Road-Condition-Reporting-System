<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const Report = require("../models/Report");

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { severity, lat, lng } = req.body;

    const report = await Report.create({
      imageUrl: req.file.path,
      severity,
      location: {
        lat: Number(lat),
        lng: Number(lng)
      }
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 });
  res.json(reports);
});

module.exports = router;
router.patch("/:id", async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(report);
});

=======
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
>>>>>>> 3f37c786ac841f45ad1d12aee0c28abcd164e886
