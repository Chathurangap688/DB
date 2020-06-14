var mysql = require('mysql');
var rootConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });
  rootConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // rootConnection.query("CREATE DATABASE mydb", function (err, result) {
    //   if (err) throw err;
    //   // console.log(err);
    //   console.log("Database created");
    // }); 
  });  