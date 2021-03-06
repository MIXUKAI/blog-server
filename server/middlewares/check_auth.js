const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization.split(' ')[1];
    jwt.verify(token, 'mixukai');
    await next();
  } catch(err) {
    ctx.body = {
      code: 1,
      status: 401,
      msg: 'unauthorized'
    }
  }
}