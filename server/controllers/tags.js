const Tag = require('../models/tags').Tag;

class TagControllers {

  static async findAll(ctx) {
    ctx.body = await Tag.find();
  }

  static async findById(ctx) {
    try {
      const tag = await Tag.findById(ctx.params.id);
      if (!tag) {
        ctx.throw(404);
      }
      ctx.body = tag;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  static async add(ctx) {
    try {
      const tag = await new Tag(ctx.request.body).save();
      ctx.body = {
        code: 0,
        msg: 'successful',
        data: tag
      };
    } catch (err) {
      ctx.body = {
        code: 1,
        msg: 'fail'
      };
      ctx.throw(422);
    }
  }
}

module.exports = { TagControllers };