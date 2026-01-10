// controller to generate the short url and send the response back
// tasks

/// handle Input validation
// generate short url
// save the data to database
// send proper response back to user
const shortid = require("shortid");

const handleGenerateUrl = async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({
      success: false,
      message: "Url is required",
    });
  }
  const incomingUrl = req.body.url;
  const shortId = shortid.generate();
  console.log(shortId);

  // save to db

  res.status(201).json({
    success: true,
    message: "tiny url is created",
    shortUrl: `http://localhost:5000/${shortId}`,
  });
};

module.exports = { handleGenerateUrl };
