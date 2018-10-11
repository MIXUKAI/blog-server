const Router = require('koa-router');
const { ArticleControllers } = require('../controllers/articles');
const { baseApi } = require('../../config');

// Creata a Router instance
const router = new Router();

// Config prefixPath
const prefixPath = `/${baseApi}/article`;

// Set the path prefix for a Router instance that was already initialized.
router.prefix(prefixPath);

router.get('/all', ArticleControllers.findAll);

// 获取文章列表
router.get('/', ArticleControllers.findByPage);

router.get('/:tagname', ArticleControllers.findByTagName);

// 详细的某篇文章
router.get('/:id', ArticleControllers.findById);

// 发布文章
router.post('/add', ArticleControllers.add);

module.exports = router;
