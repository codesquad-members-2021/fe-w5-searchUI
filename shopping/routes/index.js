var express = require("express");
var router = express.Router();
var fs = require("fs");
let planningEvent = require("../public/images/planningEvent.json");



/* GET home page. */
router.get("/", function (req, res, next) {
  res.cookie("hasVisited", "1", { path: "/" });
  res.render("index", {
    title: "Shoppinghow",
    event: planningEvent,
  });
});



module.exports = router;
