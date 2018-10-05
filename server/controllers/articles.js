const Article = require('../models/articles').Article;

class ArticleControllers {

  static async findAll(ctx) {
    ctx.body = await Article.find();
  }

  static async add(ctx) {
    try {
      const article = await new Article(ctx.request.body).save();
      ctx.body = article;
    } catch (err) {
      // TODO: what's 422 means
      ctx.throw(422);
    }
  }
}

module.exports = { ArticleControllers };