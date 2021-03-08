import express from "express";
import indexRouter from "./router/index.js";
const app = express();
const PORT = process.env.PROT || 8080;

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log("server is running");
});
