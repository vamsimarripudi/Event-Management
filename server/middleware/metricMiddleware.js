const ApiMetric = require("../models/ApiMetric");

const metricsMiddleware = (
  req,
  res,
  next
) => {
  const start = Date.now();

  res.on("finish", () => {
    setImmediate(async () => {
      try {
        const duration =
          Date.now() - start;

        await ApiMetric.create({
          endpoint: req.originalUrl,
          method: req.method,
          statusCode: res.statusCode,
          duration,
        });
      } catch (err) {
        console.log(err.message);
      }
    });
  });

  next();
};
module.exports = metricsMiddleware;