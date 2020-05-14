const mysql = require('mysql2');
const bluebird = require('bluebird');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
  }).promise();

  
  
  
  pool.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log('Pool close');
  });

  module.exports = pool;