const express = require("express");
const {
  createReceipt,
  getReceipt,
} = require("../controllers/receipts.controller");

const router = express.Router();

router.post("/process", createReceipt);
router.get("/:id/points", getReceipt);

module.exports = router;
