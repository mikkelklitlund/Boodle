const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //
  res.status('404').end();
});
router.post("/", (req, res) => {
  //
  res.status('404').end();
});

router.put("/", (req, res) => {
  //
  res.status('404').end();
});

router.delete("/", (req, res) => {
  //
  res.status('404').end();
});

module.exports = router;