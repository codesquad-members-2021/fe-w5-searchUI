const express = require('express');
const path = require('path');
const cors = require('cors'); //CORS 미들웨어 객체 선언
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(cors());// CORS 미들웨어 등록

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});