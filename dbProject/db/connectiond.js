var create_tables = require('./create_tables');
var randomstring = require("randomstring");
var mysql = require('mysql');
var rootConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
  });
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
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
  },
  temp_data(){
    var first_name = randomstring.generate(5);
    var last_name = randomstring.generate(5);
    var user_name = randomstring.generate(5);
    var address = randomstring.generate(25);
    var contact_number = randomstring.generate({
      length: 12,
      charset: '12345678900'
    });
    var country = randomstring.generate(7);
    var age = getRandomInt(65);
    var user_type = getRandomInt(2);
    var quary = "INSERT INTO user(user_name, address, age, contact_number, country, first_name, last_name, user_type) VALUES ('"
    + user_name +"', '"
    + address+"', "
    + age+", '"
    + contact_number+"', '"
    + country+"', '"
    + first_name +"', '"
    + last_name +"', "
    + user_type+ " "
    + ")";
    var user_id = 0;
    rootConnection.query( quary, function (err, result) {
      if (err) throw err;
        console.log(quary +" temp data Insert");
      var userIdq = "SELECT * from user where user_name = '"+user_name+"';";
      rootConnection.query( userIdq, function (err, result) {
        if (err) throw err;
        // console.log(result);
        user_id = result[0].user_id;
        var userquary = "";
        if(user_type == 1){
           userquary = "INSERT INTO sellers (seller_id) VALUES ("+ user_id+");";
        }else{
           userquary = "INSERT INTO buyers (buyer_id) VALUES ("+ user_id+");";
        }
        rootConnection.query( userquary, function (err, result) {
          if (err) throw err;
          console.log("add user type");
        }); 
        var balance = getRandomInt(65000);
        var bankQuarry = "INSERT INTO bank_accounts (user_id, balance) VALUES("+user_id+","+balance+");";
        rootConnection.query( bankQuarry, function (err, result) {
          if (err) throw err;
          console.log("add bank  account");
        }); 
        var passwordq = "INSERT INTO login_frofile (user_id, user_name, password, session_id,last_update,user_status) VALUES ("
        + user_id + " , '" 
        + user_name + "' , '" 
        + "password' , '" 
        + "session' , " 
        + "NOW() , " 
        + "1" 
        + ");";
        rootConnection.query( passwordq, function (err, result) {
          if (err) throw err;
          console.log("add password  account");
        }); 
      });
    }); 

  }
 } 
 