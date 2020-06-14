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
  function getbanckaccbyid(id){
    var qury = "SELECT * from bank_accounts where user_id = "+ id + ";";
    var val = 0;
    rootConnection.query( qury, function (err, result) {
      if (err) throw err;      
      val =  result[0].account_id;
      return val;
    });
    
    // setTimeout(function(){return val},1); 
  }
  function getItembyId(itemid){
    var quary = "SELECT * from items where item_id = "+ itemid +";";
    var val = 0;
    rootConnection.query( quary, function (err, result) {
      if (err) throw err;
      console.log(qury + " result "+result);
      val =  result[0];
    });
    return val;
    // setTimeout(function(){return val},0); 
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
        if(user_type == 1){
          var temp = getRandomInt(10);
          for(i = 0; i <= temp; i++){
            var available_quntity = getRandomInt(100);
            var unit_price = getRandomInt(10000);
            var item_name = randomstring.generate(5);
            var discription = randomstring.generate(150);
            var itemq = "INSERT INTO items(item_name, discription, seller_id, add_date, exp_date ,available_quntity, unit_price) VALUES ('"
              + item_name + "','" 
              + discription + "'," 
              + user_id + "," 
              + "NOW()," 
              + "NOW() + INTERVAL 1 YEAR," 
              + available_quntity + "," 
              + unit_price
              +");";
              rootConnection.query( itemq, function (err, result) {
                if (err) throw err;
                console.log("add item");
              }); 

          }
        }
      });
    }); 

  },
  temp_order(itemid){
    var item = [];
    var quary = "SELECT * from items where item_id = "+ itemid +";";
    var val = 0;
    rootConnection.query( quary, function (err, result) {
      if (err) throw err;
      item =  result[0];
      var seller_id = item.seller_id;
      var temp = "SELECT * from buyers where buyer_id > "+ getRandomInt(1000);
      rootConnection.query( temp, function (err, result) {
        if (err) throw err;
        buyer_id = result[0].buyer_id;
        var seller_bank_id = "";
        var buyer_bank_id = "";
        var quntity = 0;
        var up = 0;
        seller_id = item.seller_id;
        up= item.unit_price;
        quntity = getRandomInt(item.available_quntity);
        var qury = "SELECT * from bank_accounts where user_id = "+ seller_id + ";";
        rootConnection.query( qury, function (err, result) {
          if (err) throw err;      
          seller_bank_id =  result[0].account_id;
          qury = "SELECT * from bank_accounts where user_id = "+ buyer_id + ";";
          rootConnection.query( qury, function (err, result) {
            if (err) throw err;      
            buyer_bank_id =  result[0].account_id;
            var discription = randomstring.generate(100);
            var delivery_address = randomstring.generate(50);
            var quary1 = "INSERT INTO orders (discription, delivery_address, seller_id, seller_bank_id, buyer_id, buyer_bank_id, item_id, quntity, totle_amount, create_date, compleate_date, order_status) VALUES ('"
            + discription + "', '"
            + delivery_address + "', "
            + seller_id + ", "
            + seller_bank_id + ", "
            + buyer_id + ", "
            + buyer_bank_id + ", "
            + itemid + ", "
            + quntity +", "
            + (up*quntity) + ", "
            + "NOW(), "
            + "NOW() + INTERVAL 1 YEAR,"
            + "1"
            +");";
            console.log(quary1);
            rootConnection.query( quary1, function (err, result) {
              if (err) throw err;
              console.log("add new arder...");
            }); 
            });
        });
      }); 


      
    });
    
  }
 } 
 