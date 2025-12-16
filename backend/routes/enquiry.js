const express = require("express");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

/* ================= CREATE ENQUIRY ================= */
router.post("/", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET ALL ENQUIRIES ================= */
/* date filter supported: ?from=2025-12-01&to=2025-12-16 */
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};
    if (from && to) {
      filter.createdAt = {
        $gte: new Date(from),
        $lte: new Date(to),
      };
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= DELETE ENQUIRY ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
