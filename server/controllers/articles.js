const Article = require('../models/articles').Article;
const sizeOfPage = 5;

class ArticleControllers {

  // 查询所有的文章
  static async findAll(ctx) {
    ctx.body = await Article.find({hidden: false});
  }

  // 查看总共多少页
  static async findPageCount(ctx) {
    const articleCount = await Article.find({hidden: false}).count();
    ctx.body = Math.ceil(articleCount / sizeOfPage);
  }

  static async findByPage(ctx) {
    // TODO: need try catch?
    const page = ctx.query.page || 1;
    const skipPage = page - 1;
    ctx.body = await Article.find({hidden: false}).skip(skipPage * sizeOfPage).limit(sizeOfPage);
  }

  static async findByTagName(ctx) {
    try {
      const article = await Article.find({ tags: ctx.params.tagname, hidden: false });
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

  // 因为能够展示出来id的已经是hidden为false的了，所有不再需要设置了
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

  // 不是真正的删除，只是吧hidden设置true，然后就不展示了
  static async findByIdAndSetHidden(ctx) {
    try {
      const article = await Article.findByIdAndUpdate(ctx.params.id, {hidden: true});
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

  // 找到所有发布的文章的标签，而不是写文章时候要用的常用标签
  static async findAllPublishedTags(ctx) {
    try {
      const articles = await Article.find({hidden:false});
      if (!articles) {
        ctx.throw(404);
      }
      // 所有标签累计在一起；
      const allTags = articles.reduce((pre, cur) => {
        return pre.concat(cur.tags);
      }, []);
      // 去重
      const result = [...new Set(allTags)];
      ctx.body = result;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }
}

module.exports = { ArticleControllers };