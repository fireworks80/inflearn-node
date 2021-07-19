const express = require('express');
const router = express.Router();

// localhost:3007/user/ 와 같음
// GET /user/
router.get('/', (req, res) => {
  res.send('Hello user');
});

router.get('/:id', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  const { limit, skip } = req.query;
  res.send('get param: ' + req.params.id + ', ' + limit + ', ' + skip);
});

module.exports = router;
