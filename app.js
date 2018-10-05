const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const { hostname, port, connectionStr } = require('./config');

const articleRouter = require('./server/routes/articles');

// Connect to the database
mongoose.connect(connectionStr, { useNewUrlParser: true });
// Get notified if we connect successfully or if a connection error occurs
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Congratulations, mongodb connected successfully~'));

// Create Koa application
const app = new Koa();
const router = new Router();

// index page
router.get('/', index);
router.get('/article/:id', getArticle);
// generate index page
function index(ctx) {
  ctx.body = 'this is index page';
}
// show article about particular identity
function getArticle(ctx) {
  ctx.body = `article'is ${ctx.params.id}`;
}



// app.use(ctx => ctx.body = 'hello world');

app.use(router.routes()).use(router.allowedMethods());

app.use(articleRouter.routes());

// Start the application
const server = app.listen(port, hostname, () => {
  const address = server.address();
  console.log(`server is running at http://${address.address}:${address.port}/`);
})