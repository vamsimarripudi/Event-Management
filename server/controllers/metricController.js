const ApiMetric = require("../models/ApiMetric");

/* ---------- Overview ---------- */

const getOverview = async (req, res) => {
  try {
    const totalRequests =
      await ApiMetric.countDocuments();

    const avgData = await ApiMetric.aggregate([
      {
        $group: {
          _id: null,
          avgResponse: {
            $avg: "$duration",
          },
          maxResponse: {
            $max: "$duration",
          },
        },
      },
    ]);

    const failedRequests =
      await ApiMetric.countDocuments({
        statusCode: { $gte: 400 },
      });

    const successRate =
      totalRequests > 0
        ? (
            ((totalRequests - failedRequests) /
              totalRequests) *
            100
          ).toFixed(2)
        : 0;

    res.json({
      totalRequests,
      avgResponse:
        avgData[0]?.avgResponse || 0,
      maxResponse:
        avgData[0]?.maxResponse || 0,
      failedRequests,
      successRate,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/* ---------- Timeline ---------- */

const getTimeline = async (req, res) => {
  try {
    const timeline =
      await ApiMetric.aggregate([
        {
          $group: {
            _id: {
              hour: {
                $hour: "$timestamp",
              },
            },

            avgResponse: {
              $avg: "$duration",
            },

            requests: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            "_id.hour": 1,
          },
        },
      ]);

    res.json(timeline);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/* ---------- Endpoint Analytics ---------- */

const getEndpoints = async (req, res) => {
  try {
    const endpoints =
      await ApiMetric.aggregate([
        {
          $group: {
            _id: {
              endpoint: "$endpoint",
              method: "$method",
            },

            hits: {
              $sum: 1,
            },

            avgTime: {
              $avg: "$duration",
            },

            minTime: {
              $min: "$duration",
            },

            maxTime: {
              $max: "$duration",
            },

            errors: {
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

        {
          $sort: {
            hits: -1,
          },
        },
      ]);

    res.json(endpoints);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

/* ---------- Slow Requests ---------- */

const getSlowRequests = async (
  req,
  res
) => {
  try {
    const slowRequests =
      await ApiMetric.find({
        duration: { $gte: 1000 },
      })
        .sort({ duration: -1 })
        .limit(20);

    res.json(slowRequests);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  getOverview,
  getTimeline,
  getEndpoints,
  getSlowRequests,
};