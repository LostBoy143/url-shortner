const express = require("express");
const urlRoutes = require("./routes/url.routes.js");
const { connectDB } = require("./config/db.js");
const { ENV } = require("./config/env.js");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});
app.use("/url", urlRoutes);

// Bootstrap server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(
        `Server running on http://localhost:${ENV.PORT}`
      );
    });
  } catch (error) {
    console.error(" Failed to start server");
    process.exit(1);
  }
};

startServer();
