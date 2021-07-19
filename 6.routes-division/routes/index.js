const express = require('express');
const path = require('path');

// router 객체 생성
const router = express.Router();

// GET / 와 같음
router.get('/', (req, res) => {
  // res.send('Hello express');
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 해당 라우터를 내보냄
module.exports = router;
//
