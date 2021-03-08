import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const __dirname = path.resolve();

const homeContentsData = fs.readFileSync(`${__dirname}/backend/data/homeContents.json`, 'utf8', (err, data) => {
  return data;
});
const planningEventsData = fs.readFileSync(`${__dirname}/backend/data/planningEvents.json`, 'utf8', (err, data) => {
  return data;
});

const hottestData = [1,2,3,4,5,6,7,8,9,10];

router.get("/hottest", (req, res) => {
  return res.status(200).send({hottest: hottestData});
});

router.get("/planning-events", (req, res) => {
  return res.status(200).send(planningEventsData);
});

// 페이지 네이션 작업 필요
router.get("/home-contents", (req, res) => {
  return res.status(200).send(homeContentsData);
});

export default router;
