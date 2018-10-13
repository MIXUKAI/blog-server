const jwt = require('jsonwebtoken');

module.exports =  ctx => {
  console.log(ctx.request.body);
  if (ctx.request.body.password === 'bokemima') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({role: 'admin'}, 'mixukai'), 
      data: {
        code: 0,
        msg: 'success'
      }
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed'
    };
  }
  return ctx;
};