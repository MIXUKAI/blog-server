const Router = require('koa-router');

// Creata a Router instance
const router = new Router();

// Config prefixPath
const baseApi = 'api';
const prefixPath = `/${baseApi}/article`;

// Set the path prefix for a Router instance that was already initialized.
router.prefix(prefixPath);




export default router;
