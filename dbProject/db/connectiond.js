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

      rootConnection.query( create_tables.sellers, function (err, result) {
        if (err) throw err;
        console.log("sellers Table created");
      }); 

      rootConnection.query( create_tables.buyers, function (err, result) {
        if (err) throw err;
        console.log("buyers Table created");
      }); 

      rootConnection.query( create_tables.items, function (err, result) {
        if (err) throw err;
        console.log("items Table created");
      }); 

      rootConnection.query( create_tables.bankAccounts, function (err, result) {
        if (err) throw err;
        console.log("bankAccounts Table created");
      }); 

      rootConnection.query( create_tables.orders, function (err, result) {
        if (err) throw err;
        console.log("orders Table created");
      }); 

    }); 
  },
  init_users(){
    console.log("crate users");
  }
 } 
 