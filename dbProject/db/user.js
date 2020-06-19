var ip = "localhost";
var db_name = "mydb";

exports.create_admin = "CREATE USER IF NOT EXISTS 'admin'@'" + ip + "' IDENTIFIED BY 'password';";
exports.create_application_user = "CREATE USER IF NOT EXISTS 'appuser'@'" + ip + "' IDENTIFIED BY 'password';";
exports.create_guest_user = "CREATE USER IF NOT EXISTS 'guest'@'" + ip + "' IDENTIFIED BY 'password';";

exports.grant_admin_Privilege = "GRANT ALL PRIVILEGES ON `" + db_name + "`.* TO 'admin'@'" + ip + "'  WITH GRANT OPTION";
exports.grant_guest_user_Privilege = "GRANT SELECT ON `" + db_name + "`.items TO 'guest'@'" + ip + "';";
exports.grant_application_user_Privilege1 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.user TO 'appuser'@'" + ip + "';";
exports.grant_application_user_Privilege2 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.sellers TO 'appuser'@'" + ip + "';";
exports.grant_application_user_Privilege3 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.buyers TO 'appuser'@'" + ip + "';";
exports.grant_application_user_Privilege4 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.items TO 'appuser'@'" + ip + "';";
exports.grant_application_user_Privilege5 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.bank_accounts TO 'appuser'@'" + ip + "';";
exports.grant_application_user_Privilege6 =  "GRANT INSERT, SELECT, UPDATE ON `" + db_name + "`.orders TO 'appuser'@'" + ip + "';";