var mysql = require('mysql');
exports.adminConnection = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password",
    database: "mydb"
  });

exports.appUserConnection = mysql.createConnection({
    host: "localhost",
    user: "appuser",
    password: "password",
    database: "mydb"
  });
exports.guestConnection = mysql.createConnection({
    host: "localhost",
    user: "guest",
    password: "password",
    database: "mydb"
  });