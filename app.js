const Koa = require('koa');
const cors = require('koa2-cors');
var bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { port, connectionStr } = require('./config');

const articleRouter = require('./server/routes/articles');
const tagRouter = require('./server/routes/tags');
const draftRouter = require('./server/routes/drafts');
const AuthenticateRouter = require('./server/routes/authenticate');

mongoose.connect(connectionStr, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('Congratulations, mongodb connected successfully~'));

const app = new Koa();

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

app.use(articleRouter.routes());
app.use(tagRouter.routes());
app.use(draftRouter.routes());
app.use(AuthenticateRouter.routes());

app.listen(port, () => {
  console.log(`server is running at prot ${prot}`);
})