const express = require('express');
const xss = require('xss');
const app = express();
const service = require('./service.js');
const $ = require('axios');


const port = process.argv[2] || 4000;

console.log(`express start in ${port}`);

if(!port) {
	console.error('must have a port');
	console.error('server run failed');
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Strict-Transport-Security', 'max-age=172800');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

app.disable('x-powered-by');

app.get('/', (request, response) => {
  response.send('start');
});

/**
 * type 沪深股`
 */
app.get('/hs/:page', (request, response) => {
	const page = xss(request.params.page);


	service.getHsData(page).then((res) => {
	
		response.send(res.data);
	})
});

app.get('/hs_low_order/:page', (request, response) => {
  const page = xss(request.params.page);

	service.getHsData(page, 1).then((res) => {
		response.send(res.data);
	})
});

app.get('/hs_hybk', (request, response) => {
	service.hs_lzbk().then((res) => {
		response.send(res.data);
	}) 
});



app.get('/gupiao/', (request, response) => {

	//response.set('Content-Type', 'application/x-javascript; charset=GBK');
	
	const detail = xss(request.query.detail);


	service.getDetail(detail).then((res) => {
		response.set('Content-Type', 'application/x-javascript; charset=utf-8');
		response.send(res.data);
	})
});



/**
 * type 港股 page, num ,sort, asc, node ,dpc
 */

//港股 蓝筹股 
app.get('/gg/lc/:page', (request, response) => {
  const page = xss(request.params.page);

	service.getGgData(page, 10, 'percent', 0, 'lcg_hk', 1).then((res) => {
		response.send(res.data);
	})
});

//港股 国企股
app.get('/gg/gq/:page', (request, response) => {
  const page = xss(request.params.page);

	service.getGgData(page, 10, 'percent', 0, 'gqg_hk', 1).then((res) => {
		response.send(res.data);
	})
});

//港股 红筹股
app.get('/gg/hc/:page', (request, response) => {
  const page = xss(request.params.page);

	service.getGgData(page, 10, 'percent', 0, 'hcg_hk', 1).then((res) => {
		response.send(res.data);
	})
});

//港股 创业板
app.get('/gg/cyb/:page', (request, response) => {
  const page = xss(request.params.page);

	service.getGgData(page, 10, 'percent', 0, 'cyb_hk', 1).then((res) => {
		response.send(res.data);
	})
});


/**
 * type 中国市场
 */
app.get('/cnmk', (request, response) => {
	const list = xss(request.query.list);
	service.getCNMK(list).then((res) => {
		response.send(res.data);
	})
})


const server = app.listen(Number(port), function () {
	console.log('app is running host: ' + server.address().address + '\n');
	console.log('app is running prot: ' + server.address().port);
});