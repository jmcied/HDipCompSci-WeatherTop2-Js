"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js")

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get('/dashboard/deleteStation/:id', dashboard.deleteStation);


router.get("/station/:id", station.index);
router.get("/station/:id/removeReading/:readingId", station.removeReading);
router.post("/station/:id/addReading", station.addReading);


module.exports = router;
