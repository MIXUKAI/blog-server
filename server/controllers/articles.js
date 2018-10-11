const Article = require('../models/articles').Article;

class ArticleControllers {

  // 查询所有的文章，暂且没用
  static async findAll(ctx) {
    ctx.body = await Article.find();
  }

  static async findByPage(ctx) {
    // TODO: need try catch?
    const sizeOfPage = 3;
    const page = ctx.query.page || 1;
    const skipPage = page - 1;
    ctx.body = await Article.find().skip(skipPage * sizeOfPage).limit(sizeOfPage);
  }

  static async findByTagName(ctx) {
    try {
      const article = await Article.find({ tags: ctx.params.tagname });
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

  static async findByIdAndUpdate(ctx) {
    try {
      const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!article) {
        ctx.throw(404);
      }
      ctx.body = {
        code: 0, // 0代表成功
        msg: 'successful',
        data: article
      };
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.body = {
        code: 1,
        msg: 'fail'
      };
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