// controller to generate the short url and send the response back
// tasks

/// handle Input validation
// generate short url
// save the data to database
// send proper response back to user
const shortid = require("shortid");
const urlModel = require("../models/url.model.js");

const handleGenerateUrl = async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(400).json({
        success: false,
        message: "Url is required",
      });
    }

    const incomingUrl = req.body.url;
    // url validation
    if (!/^https?:\/\/.+/i.test(incomingUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }
    // short id generation
    const shortId = shortid.generate();

    // save to db
    const result = await urlModel.create({
      shortId,
      redirectUrl: incomingUrl,
    });
    // sending response
    res.status(201).json({
      success: true,
      message: "tiny url is created",
      shortUrl: `http://localhost:8000/${shortId}`,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error...",
    });
    process.exit(1);
  }
};

// handle redirectUrl

const handleRedirectUrl = async (req, res) => {
  try {
    if (!req.params.shortId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    const shortId = req.params.shortId;
    const redirect =
      await urlModel.findOneAndUpdate(
        {
          shortId: shortId,
        },
        {
          $push: {
            visitHistory: {
              timestamp: new Date(),
            },
          },
        },
        { new: true }
      );
    const url = redirect.redirectUrl;
    res.redirect(url);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error...",
    });
    process.exit(1);
  }
};

module.exports = {
  handleGenerateUrl,
  handleRedirectUrl,
};
