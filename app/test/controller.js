const express = require('express');
const router = express.Router();
const xss = require('xss');

router.get('/1', (request, response) => {
    const data = { test: 1 };
    response.send(xss(JSON.stringify(data)));
});

router.get('/2', (request, response) => {
  const data = { test: 2 };
  response.send(xss(JSON.stringify(data)));
});

router.get('/3', (request, response) => {
  const data = { test: 3 };
  response.send(xss(JSON.stringify(data)));
});


module.exports = router;