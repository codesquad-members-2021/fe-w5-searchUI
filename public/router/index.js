import express from "express";
import path from "path";
const router = express.Router();
const __dirname = path.resolve();
const HTML_FILE = path.join(__dirname, "public", "src", "index.html");

router.get("/", (req, res, next) => {
  res.sendFile(HTML_FILE);
});

export default router;
