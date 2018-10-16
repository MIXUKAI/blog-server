const Router = require('koa-router');
const { ArticleControllers } = require('../controllers/articles');
const { baseApi } = require('../../config');
const checkAuth = require('../middlewares/check_auth');

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

// 页面数量
router.get('/pagecount', ArticleControllers.findPageCount);

// 根据标签名来获取该标签下的所有文章
router.get('/tag/:tagname', ArticleControllers.findByTagName);

// 找到所有已经发布的标签
router.get('/tags', ArticleControllers.findAllPublishedTags);

// 详细的某篇文章
router.get('/:id', ArticleControllers.findById);

// 发布文章
router.post('/add', checkAuth, ArticleControllers.add);

// 根据id号来更新文章
router.post('/update/:id', checkAuth, ArticleControllers.findByIdAndUpdate);

// 根据id来删除（隐藏）文章
router.post('/delete/:id', checkAuth, ArticleControllers.findByIdAndSetHidden);



module.exports = router;
