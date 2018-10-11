const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { hostname, port, connectionStr } = require('./config');

const articleRouter = require('./server/routes/articles');
const tagRouter = require('./server/routes/tags');
const draftRouter = require('./server/routes/drafts');

// Connect to the database
mongoose.connect(connectionStr, { useNewUrlParser: true });
// Get notified if we connect successfully or if a connection error occurs
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Congratulations, mongodb connected successfully~'));

// Create Koa application
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// TODO: 现在已经成功了，之后再仔细配置下
app.use(cors({
  origin: '*',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

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
app.use(tagRouter.routes());
app.use(draftRouter.routes());

// Start the application
const server = app.listen(port, hostname, () => {
  const address = server.address();
  console.log(`server is running at http://${address.address}:${address.port}/`);
})