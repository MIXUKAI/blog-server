const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { hostname, port, connectionStr } = require('./config');
const jwt = require('koa-jwt');

const articleRouter = require('./server/routes/articles');
const tagRouter = require('./server/routes/tags');
const draftRouter = require('./server/routes/drafts');
const AuthenticateRouter = require('./server/routes/authenticate');

mongoose.connect(connectionStr, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Congratulations, mongodb connected successfully~'));

const app = new Koa();
// const router = new Router();

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

// router.get('/', index);
// function index(ctx) {
//   ctx.body = 'this is index page';
// }

// app.use(jwt({ secret: 'shared-secret' }));
app.use(articleRouter.routes());
app.use(tagRouter.routes());
app.use(draftRouter.routes());
app.use(AuthenticateRouter.routes());

// app.use(router.routes()).use(router.allowedMethods());


// router.get('/api/login', ctx => {
//   ctx.body = {
//     hello: 'dd'
//   }
// })

const server = app.listen(port, hostname, () => {
  const address = server.address();
  console.log(`server is running at http://${address.address}:${address.port}/`);
})