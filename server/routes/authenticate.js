require('babel-polyfill');
const Router = require('koa-router');
const { baseApi } = require('../../config');
const authenticate = require('../middlewares/authenticate');

const router = new Router();

router.prefix(`/${baseApi}/authenticate`);

router.post('/', authenticate);

module.exports = router;