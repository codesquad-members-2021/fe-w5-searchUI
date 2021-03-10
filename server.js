import express from "express";
import path from "path";
import indexRouter from "./public/router/index.js";

const app = express();
const PORT = process.env.PROT || 8080;
const __dirname = path.resolve();
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(express.static(PUBLIC_DIR));
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log("server is running");
});
