# multer

```
const multer = require('multer');
...

// upload에 multer에서 리턴하는 객체가 저장 된다.
const upload = multer({
  // 어디에 저장 할 것인가. (dist / memory, cloud storage)

  storage: multer.diskStorage({ // 어떤 저장공간

    destination(req, file, done) { // 어디에 저장 할 것인가.
      // 첫번째 인수는 null, 두번째 인수에 값을 넣는다.
      // 첫째 자리에는 error 발생시 error 처리 미들웨어를 넣는다.
      done(null, 'uploads/');
    },
    filename(req, file, none) { // 어떤 이름으로 올릴것인가.
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // file size
});

// 위에 설정한 upload라는 객체를 라우터에 설정
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

// 위의 upload.single()을
// app.use()를 이용해서 사용해도 되지만
// 이미지 없로드는 특정 라우터에서만 실행되기 때문에 굳이 따로 뺄 필요는 없다.
// upload.single('image') => 'image' 는 form의 [type=file]의 name 값이다.
app.use(upload.single('image'));

app.post('/upload', (req, res) => {
  console.log(req.file);
  res.send('ok');
});


```
