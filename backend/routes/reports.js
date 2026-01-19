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

