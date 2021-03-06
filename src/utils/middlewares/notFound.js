const boom = require('@hapi/boom');

const notFoundHandler = (req, res, next) => {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  next(res.redirect(req.url));
};

module.exports = notFoundHandler;