const ApiMetric =
  require("../models/ApiMetric");

const metricsMiddleware = (
  req,
  res,
  next
) => {

  const start = Date.now();

  res.on("finish", async () => {

    if (
      req.originalUrl.startsWith(
        "/api/admin/metrics"
      )
    ) {
      return;
    }

    try {

      const duration =
        Date.now() - start;

      console.log(
        `${req.method} ${req.originalUrl} - ${duration}ms`
      );

      // SAVE METRIC FIRST

      await ApiMetric.create({
        endpoint:
          req.originalUrl,

        method:
          req.method,

        duration,

        statusCode:
          res.statusCode,
      });

      // THEN AGGREGATE

      const overview =
        await ApiMetric.aggregate([
          {
            $group: {
              _id: null,

              totalRequests: {
                $sum: 1,
              },

              avgResponse: {
                $avg: "$duration",
              },

              failedRequests: {
                $sum: {
                  $cond: [
                    {
                      $gte: [
                        "$statusCode",
                        400,
                      ],
                    },
                    1,
                    0,
                  ],
                },
              },
            },
          },
        ]);

      const data = overview[0];

      const successRate =
        Math.round(
          ((data.totalRequests -
            data.failedRequests) /
            data.totalRequests) *
            100
        );

      const io =
        req.app.get("io");

      io.emit(
        "dashboard:overview",
        {
          totalRequests:
            data.totalRequests,

          avgResponse:
            Math.round(
              data.avgResponse
            ),

          failedRequests:
            data.failedRequests,

          successRate,
        }
      );

    } catch (err) {

      console.log(err);

    }

  });

  next();

};

module.exports =
  metricsMiddleware;