const express = require("express");
const {
  handleGenerateUrl,
} = require("../controllers/url.controller.js");
const router = express.Router();

// to generate short url (It takes redirect url as input)
router.post("/", handleGenerateUrl);

module.exports = router;
