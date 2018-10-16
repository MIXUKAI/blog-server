const port = process.env.PORT || 8080;
const connectionStr = 'mongodb://127.0.0.1:27017/gn_blog';
const baseApi = 'api';
module.exports = { port, connectionStr, baseApi };