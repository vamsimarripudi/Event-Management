const express = require("express");

const router = express.Router();

const {
  getOverview,
  getTimeline,
  getEndpoints,
  getSlowRequests,
} = require(
  "../controllers/metricsController"
);

router.get("/overview", getOverview);

router.get("/timeline",getTimeline);

router.get(
  "/endpoints",
  getEndpoints
);

router.get(
  "/slow-requests",
  getSlowRequests
);

module.exports = router;