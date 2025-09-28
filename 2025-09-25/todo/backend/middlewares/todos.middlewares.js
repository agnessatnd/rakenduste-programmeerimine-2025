const todosRouteMiddleware = (req, res, next) => {
  console.log("Time:", Date.now());
  next();
};

const todosGetRouteMiddleware = (req, res, next) => {
  console.log("GET /todos middleware");
  next();
};

module.exports = { todosRouteMiddleware, todosGetRouteMiddleware };
