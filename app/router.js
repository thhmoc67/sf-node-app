var indexRouter = require("./controllers");
var usersRouter = require("./controllers/users");
var otpRouter = require("./controllers/otp");

const router = app => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/otp",otpRouter)
};

module.exports = router
