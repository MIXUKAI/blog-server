const Router = require('koa-router');
const { ArticleControllers } = require('../controllers/articles');
const { baseApi } = require('../../config');

// Creata a Router instance
const router = new Router();

// Config prefixPath
const prefixPath = `/${baseApi}/article`;

// Set the path prefix for a Router instance that was already initialized.
router.prefix(prefixPath);

router.get('/', ArticleControllers.findAll);

router.post('/add', ArticleControllers.add);

module.exports = router;
