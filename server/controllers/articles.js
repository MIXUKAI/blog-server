const Article = require('../models/articles').Article;

class ArticleControllers {

  static async findAll(ctx) {
    ctx.body = await Article.find();
  }

  static async findById(ctx) {
    try {
      const article = await Article.findById(ctx.params.id);
      if (!article) {
        ctx.throw(404);
      }
      ctx.body = article;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  static async add(ctx) {
    try {
      const article = await new Article(ctx.request.body).save();
      ctx.body = {
        code: 0, // 0代表成功
        msg: 'successful',
        data: article
      };
    } catch (err) {
      ctx.body = {
        code: 1,
        msg: 'fail'
      };
      // TODO: what's 422 means
      ctx.throw(422);
    }
  }
}

module.exports = { ArticleControllers };