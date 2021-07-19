const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads폴더를 생성한다');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
  console.log('get upload');
  res.sendFile(path.join(__dirname, 'upload.html'));
});

app.post('/upload', upload.array('image'), (req, res) => {
  console.log('post upload', req.files, req.body.title);
  res.send('ok');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(`listen: ${app.get('port')}`);
});
