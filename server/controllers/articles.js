const Article = require('../models/articles').Article;

class ArticleControllers {

  static async findAll(ctx) {
    ctx.body = await Article.find();
  }

  static async add(ctx) {
    const article = await new Article({
      title: 'lodash.js curry',
      author: 'mixukai',
      md_content: '## h1',
      html_content: '<h2>h1</h2>',
      category: 'life',
      tags: ['javascript', 'programming'],
      hidden: false
    }).save();
    ctx.body = await 'add successfully';
  }
}

module.exports = { ArticleControllers };