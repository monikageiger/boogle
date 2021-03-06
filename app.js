//Require files and packages
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var authRouter = require("./routes/auth.routes");
var bookApiRouter = require("./routes/bookApi.routes");
var createdBookRouter = require("./routes/created.book.routes");
var savedBookRouter = require("./routes/saved.book.routes");
var bookshelfRouter = require("./routes/bookshelf.routes");

var app = express();

// Functional curling style of loading configuration
require("./config/db");
require("./config/global")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/books", createdBookRouter);
app.use("/my-saved-books", savedBookRouter);
app.use("/search", bookApiRouter);
app.use("/bookshelf", bookshelfRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    style: "error.css"
  });
});

module.exports = app;