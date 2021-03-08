import express from "express";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();
const SRC_DIR = path.join(__dirname, "src");
const HTML_FILE = path.join(SRC_DIR, "index.html");

router.get("/", (req, res, next) => {
  res.sendFile(HTML_FILE);
});

export default router;
