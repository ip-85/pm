const mysql = require('mysql2');
const pool = require('./ProjectDB.module');

class user {
    constructor(name, email, timestamp, password) {
        this.name = name;
        this.email = email;
        this.timestamp = new Date;
        this.password = password;
    }

    static Find(id){
        const sql = `SELECT * FROM users WHERE id = ? LIMIT 1`
    
        console.log(`Querying for user id ${id}...`)
    
        return new Promise( resolve => {
          pool.execute(sql, [id], (err, resultRow) => {
            console.log(`...found ${JSON.stringify(resultRow)}!`)
    
            const user = new User(resultRow.name, resultRow.email, resultRow.timestamp, resultRow.password)
            user.id = resultRow.id
    
            resolve(user)        
          })
        })  
    }

    static All(){
        const sql = `SELECT * FROM users`
    
        console.log(`Loading all users...`)
        return new Promise( resolve => {
          pool.execute(sql, (err, results) => {
            console.log(`...found ${results.length} users!`)
    
            const users = results.map( userRow => {
              const user = new User(userRow.name, userRow.email, userRow.timestamp, userRow.password)
              user.id = userRow.id
              return user
            })
    
            resolve(users)
          })
        })      
    }
    
    insert() {
        const self = this
        const sql = `INSERT INTO users(name, email, timestamp, password) VALUES(?, ?, ?, ?)`
        console.log(`Inserting user ${self.name} into database...`)
    
        return new Promise( resolve => {
          pool.execute(sql, [self.name, self.email, self.timestamp, self.password], () => {
            console.log(`...user ${this.lastID} inserted into database`)
            self.id = this.lastID
            resolve(self)
          })
        })
      }   
      

};

module.exports = user;