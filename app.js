import express from "express";
import ejs from "ejs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');     // ejs -> html 사용
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.SERVER_PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

const port = app.get('port');
app.listen(port, () => console.log(`http://localhost:${port}`));

export default app;