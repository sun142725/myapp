const mysql=require('mysql');
const connection = mysql.createConnection({
    host:'47.93.206.48',
    user:'root',
    password:'18334771358s',
    database:'hs_tororo'
})
connection.connect();
module.exports=connection;