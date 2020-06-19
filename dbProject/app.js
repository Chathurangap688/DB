var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/config');
var order = require('./app_modules/buyer_module/order');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();
// comment following init line after run 1st time
db.init_tabales();
db.init_users();
db.init_index();
// db.init_users();
// for(i = 0; i < 1000; i++){
//   db.temp_data();
// }
// for(i = 1000; i < 5000; i++){
//   db.temp_order(i);
// }


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
order.update_bank_acc(1,3,700);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
