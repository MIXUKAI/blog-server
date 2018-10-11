const Router = require('koa-router');
const { ArticleControllers } = require('../controllers/articles');
const { baseApi } = require('../../config');

// Creata a Router instance
const router = new Router();

// Config prefixPath
const prefixPath = `/${baseApi}/article`;

// Set the path prefix for a Router instance that was already initialized.
router.prefix(prefixPath);

// 获得所有文章
router.get('/all', ArticleControllers.findAll);

// 获取页面文章列表
router.get('/', ArticleControllers.findByPage);

// 根据标签名来获取该标签下的所有文章
router.get('/tag/:tagname', ArticleControllers.findByTagName);

// 详细的某篇文章
router.get('/:id', ArticleControllers.findById);

// 发布文章
router.post('/add', ArticleControllers.add);

// 根据id号来更新文章
router.post('/update/:id', ArticleControllers.findByIdAndUpdate);

// 根据id来删除（隐藏）文章
router.post('/delete/:id', ArticleControllers.findByIdAndSetHidden);

module.exports = router;
