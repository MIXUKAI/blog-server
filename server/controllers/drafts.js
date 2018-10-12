const Draft = require('../models/drafts').Draft;
const Article = require('../models/articles').Article;

class DraftControllers {

  // 查询所有的草稿
  static async findAll(ctx) {
    ctx.body = await Draft.find({ hidden: false });
  }

  static async findByPage(ctx) {
    // TODO: need try catch?
    const sizeOfPage = 10;
    const page = ctx.query.page || 1;
    const skipPage = page - 1;
    ctx.body = await Draft.find({ hidden: false }).skip(skipPage * sizeOfPage).limit(sizeOfPage);
  }

  // 根据id来查找到草稿
  static async findById(ctx) {
    try {
      const draft = await Draft.findById(ctx.params.id);
      if (!draft) {
        ctx.throw(404);
      }
      ctx.body = draft;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  static async findByIdAndUpdate(ctx) {
    try {
      const draft = await Draft.findByIdAndUpdate(ctx.params.id, ctx.request.body);
      if (!draft) {
        ctx.throw(404);
      }
      ctx.body = {
        code: 0, // 0代表成功
        msg: 'successful',
        data: draft
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
      const draft = await new Draft(ctx.request.body).save();
      ctx.body = {
        code: 0, // 0代表成功
        msg: 'successful',
        data: draft
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
      const draft = await Draft.findByIdAndUpdate(ctx.params.id, { hidden: true });
      if (!draft) {
        ctx.throw(404);
      }
      ctx.body = {
        code: 0, // 0代表成功
        msg: 'successful',
        data: draft
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

  // 根据草稿id号来发布草稿，并从草稿箱中删除
  static async removeFromDraftsAndAddToArticles(ctx) {
    try {
      const draft = await Draft.findByIdAndUpdate(ctx.params.id, { hidden: true });
      if (!draft) {
        ctx.throw(404);
      }
      const body = ctx.request.body;
      const article = new Article(body).save();
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
}

module.exports = { DraftControllers };