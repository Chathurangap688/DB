var create_tables = require('./create_tables');
var mysql = require('mysql');
var rootConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
 module.exports = {
  init_tabales(){
    rootConnection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      rootConnection.query( create_tables.userTable, function (err, result) {
        if (err) throw err;
        // console.log(result);
        console.log("user Table created");
      }); 
      rootConnection.query( create_tables.loginProfile, function (err, result) {
        if (err) throw err;
        console.log("loginProfile Table created");
      }); 
    }); 
  },
  init_users(){
    console.log("crate users");
  }
 } 
 