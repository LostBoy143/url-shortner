const express = require("express");
const {
  handleGenerateUrl,
} = require("../controllers/url.controller.js");
const router = express.Router();

// to generate short url (It takes redirect url as input)
router.post("/generate", handleGenerateUrl);
router.get(
  "/redirect/:shortId",
  handleRedirectUrl
);

module.exports = router;
