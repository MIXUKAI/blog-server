const Router = require('koa-router');
const { TagControllers } = require('../controllers/tags');
const { baseApi } = require('../../config');

const router = new Router();

const prefixPath = `/${baseApi}/tag`;

router.prefix(prefixPath);

router.get('/', TagControllers.findAll);

router.get('/:id', TagControllers.findById);

router.post('/add', TagControllers.add);

module.exports = router;
