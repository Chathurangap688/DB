var mysql = require('mysql');
var conn = require('./../../db/connection');
var connection = conn.appUserConnection;
module.exports = {
    update_bank_acc(seller_bank_acc, buyer_bank_acc, amount){
        connection.connect(function(err) {
            if (err) {
            console.error('error connecting: ' + err.stack);
            return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        
        /* Begin transaction */
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query("UPDATE bank_accounts SET balance = balance - "+amount+" WHERE  account_id = "+buyer_bank_acc, function(err, result) {
            if (err) { 
                connection.rollback(function() {
                throw err;
                });
            }
            console.log(result.insertId);
            connection.query("UPDATE bank_accounts SET balance = balance + "+amount+" WHERE  account_id = "+seller_bank_acc, function(err, result) {
                if (err) { 
                connection.rollback(function() {
                    throw err;
                });
                }  
                connection.commit(function(err) {
                if (err) { 
                    connection.rollback(function() {
                    throw err;
                    });
                }
                console.log('Transaction Complete.');
                connection.end();
                });
            });
            });
        });
        /* End transaction */
    }
}