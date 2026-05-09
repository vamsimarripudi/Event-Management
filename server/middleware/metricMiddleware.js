const ApiMetric = require("../models/ApiMetric");

const metricsMiddleware = (
  req,
  res,
  next
) => {

  const start = Date.now();

  res.on("finish", () => {

    const duration =
      Date.now() - start;

    console.log(
      `${req.method} ${req.originalUrl} - ${duration}ms`
    );

    const io = req.app.get("io");

    io.emit("dashboard:update");

  });

  next();

};
module.exports = metricsMiddleware;