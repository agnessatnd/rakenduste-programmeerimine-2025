const adminRouteMiddleware = (req, res, next) => {
  console.log("Admin route accessed:", req.method, req.originalUrl);
  next();
};

module.exports = { adminRouteMiddleware };
