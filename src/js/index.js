const mysql = require('mysql2');
const bluebird = require('bluebird');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
  });





connection.end( err => {
    if (err) {
        console.log(err);
        return err;
    }
    else {
        console.log('DB close');
    }
});
