const mysql = require('mysql2');
const bluebird = require('bluebird');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
  }).promise();

  module.exports = pool;