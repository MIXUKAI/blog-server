const Router = require('koa-router');
const { DraftControllers } = require('../controllers/drafts');
const { baseApi } = require('../../config');

// Creata a Router instance
const router = new Router();

// Config prefixPath
const prefixPath = `/${baseApi}/draft`;

// Set the path prefix for a Router instance that was already initialized.
router.prefix(prefixPath);

// 获得所有草稿
router.get('/all', DraftControllers.findAll);

// 获取页面草稿列表
router.get('/', DraftControllers.findByPage);

// 详细的某篇草稿
router.get('/:id', DraftControllers.findById);

// 添加草稿
router.post('/add', DraftControllers.add);

// 发布草稿
router.post('/publish/:id', DraftControllers.removeFromDraftsAndAddToArticles);

// 根据id号来更新草稿
router.post('/update/:id', DraftControllers.findByIdAndUpdate);

// 根据id来删除（隐藏）草稿
router.post('/delete/:id', DraftControllers.findByIdAndSetHidden);

module.exports = router;
