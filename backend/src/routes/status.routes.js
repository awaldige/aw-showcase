const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    status: "online",
    message: "API do AW Showcase funcionando!"
  });
});

module.exports = router;