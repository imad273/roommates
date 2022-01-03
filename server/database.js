const mysql = require('mysql');

var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'roommates'
})

con.connect((err) => {
   if (err) {
      console.log(`Error: ${err}`);
   } else {
      console.log('connected');
   }
})

module.exports = con;