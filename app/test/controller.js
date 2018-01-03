const express = require('express');
const router = express.Router();
const xss = require('xss');
const { logger } = require('../../utils/logUtils');

router.get('/1', (request, response) => {
    const data = { test: 1 };
    logger.info('1');
    response.send(xss(JSON.stringify(data)));
});

router.get('/2', (request, response) => {
  const data = { test: 2 };
  logger.warn('2');
  response.send(xss(JSON.stringify(data)));
});

router.get('/3', (request, response) => {
  const data = { test: 3 };
  logger.error('3');
  response.send(xss(JSON.stringify(data)));
});

router.post('/4', (request, response) => {
  const data = { test: 4 };
  response.send(xss(JSON.stringify(data)));
});


module.exports = router;