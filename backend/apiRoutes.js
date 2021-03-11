import express from "express";
import fs from "fs";
import path from "path";
import fetch from 'node-fetch';

const router = express.Router();

const __dirname = path.resolve();

const homeContentsData = fs.readFileSync(`${__dirname}/backend/data/homeContents.json`, 'utf8', (err, data) => {
  return data;
});
const planningEventsData = fs.readFileSync(`${__dirname}/backend/data/planningEvents.json`, 'utf8', (err, data) => {
  return data;
});

const hottestData = [1,2,3,4,5,6,7,8,9,10];

const hottestKeywordsEndPoint = `https://shoppinghow.kakao.com/v1.0/shophow/top/recomKeyword.json?_=1615498261778`;

const recommendKeywordsEndPoint = (query) => {
  return `https://suggest-bar.daum.net/suggest?callback=jQuery34109366900984253996_1615496100432&limit=10&mode=json&code=utf_in_out&q=${encodeURI(query)}&id=shoppinghow_suggest&_=1615496100445`;
} 

router.get("/hottest-test", (req, res) => {
  setTimeout(() => {
    return res.status(200).send({hottest: hottestData});  
  }, 1000);  
});

router.get("/hottest", (req, res) => {
  setTimeout(async () => {
    const result = await fetch(hottestKeywordsEndPoint).then(
      (response) => {
        return response.text();
      }
    )
    return res.status(200).send({response: result});
  }, 1000);
})

router.get("/", (req, res) => {
  return res.status(200).send({  });
});

router.post("/recommend-keywords", async (req, res) => {
  const result = await fetch(recommendKeywordsEndPoint(req.body.query)).then(
    (response) => {
      return response.text();
    }
  )
  return res.status(200).send({response: result});
})

router.get("/planning-events", (req, res) => {
  return res.status(200).send(planningEventsData);
});

// 페이지 네이션 작업 필요
router.get("/home-contents", (req, res) => {
  return res.status(200).send(homeContentsData);
});

export default router;
