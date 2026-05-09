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

    global.metrics.totalRequests += 1;

    global.metrics.totalResponseTime +=
      duration;

    global.metrics.avgResponse =
      Math.round(
        global.metrics.totalResponseTime /
          global.metrics.totalRequests
      );

    if (res.statusCode >= 400) {
      global.metrics.failedRequests += 1;
    }

    const successRequests =
      global.metrics.totalRequests -
      global.metrics.failedRequests;

    global.metrics.successRate =
      Math.round(
        (successRequests /
          global.metrics.totalRequests) *
          100
      );

  });

  next();
};
module.exports = metricsMiddleware;