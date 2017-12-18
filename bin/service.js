const $ = require('axios');

const gg = function (page, num ,sort, asc, node ,dpc) {

	sort = sort || 'percent';
	asc = asc || 0;
	node = node || 'hs_a';
	dpc = dpc || 1;
	num = num || 10

	const url = 'http://gu.sina.cn/hq/api/openapi.php/HkstockService.getList';

	const options = {
		"page": parseInt(page),
		"num": num,
		"sort": sort,
		"asc": asc,
		"node": node,
		"dpc": dpc
	}

	return new Promise((resolve, reject) => {
		$.get(url, {
			params: options
		})
		.then((res) => {
			resolve(res);
		})
	})
}


const hs = function (page, asc, sort, num, node, dpc) {

	sort = sort || 'percent';
	asc = asc || 0;
	node = node || 'hs_a';
	dpc = dpc || 1;
	num = num || 10

	const url = 'http://gu.sina.cn/hq/api/openapi.php/StockV2Service.getNodeList';

	const options = {
		"page": parseInt(page),
		"num": num,
		"sort": sort,
		"asc": asc,
		"node": node,
		"dpc": dpc
	}

	return new Promise((resolve, reject) => {
		$.get(url, {
			params: options
		})
		.then((res) => {
			resolve(res);
		})
	})
}

const hs_lzbk = function () {
	const url = "http://gu.sina.cn/hq/api/openapi.php/StockV2Service.getPlateList?sort=percent&asc=0&page=1&num=10&dpc=1&plate=all";
	console.log(url);
	return new Promise((resolve, reject) => {
		$.get(url, {})
		  .then((res) => {
		  	resolve(res);
		  })
	})
}


const detail1 = function (options) {
	const url = "http://w.sinajs.cn/rn=10613249162&list=" + options;

	return new Promise((resolve, reject) => {
		$.get(url, {
			
		})
			.then((res) => {
				resolve(res);
			})
	})
}


const cnmk = function (options) {
	const url = "http://hq.sinajs.cn/rn=1512443691418&list=" + options;

	return new Promise((resolve, reject) => {
		$.get(url, {})
			.then((res) => {
				resolve(res);
			})
	})
}

module.exports = {
	getHsData: hs,
	getGgData: gg,
	getDetail: detail1,  
	hs_lzbk: hs_lzbk,
	getCNMK: cnmk
}