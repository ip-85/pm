const mysql = require('mysql2');
const pool = require('./ProjectDB.module');

class project {
    constructor (name, description, startdate, deadline) {
        this.name = name;
        this.description = description;
        this.startdate = startdate;
        this.deadline = deadline;
    }

    insert() {
        const self = this
        const sql = `INSERT INTO projects(name, description, startdate, deadline) VALUES(?, ?, ?, ?)`
        console.log(`Inserting project ${self.name} into database...`)
    
        return new Promise( resolve => {
          pool.execute(sql, [self.name, self.description, self.startdate, self.deadline], () => {
            console.log(`...project ${this.lastID} inserted into database`)
            self.id = this.lastID
            resolve(self)
          })
        })
    }

    All(){
        const sql = `SELECT * FROM projects`
    
        console.log(`Loading all projects...`)
        return new Promise( resolve => {
          pool.execute(sql, (err, results) => {
            console.log(`...found ${results.length} projects!`)
    
            const projects = results.map( projectRow => {
              const project = new project(projectRow.name, projectRow.description, projectRow.startdate, projectRow.deadline)
              project.id = projectRow.id
              return project
            })
    
            resolve(projects)
          })
        })      
    }


    update() {
        const self = this
        const sql = `UPDATE projects SET name = ?, description = ?, startdate = ?, deadline = ?`
        console.log(`Updating ${self.name}`)

        return new Promise( resolve => {
            pool.execute(sql, [self.name, self.description, self.startdate, self.deadline], () => {
            console.log(`...project ${this.lastID} inserted into database`)
            })
            All();
        })
    }

    Find(name){
        const sql = `SELECT * FROM projects WHERE name LIKE ?`
    
        console.log(`Querying for project name ${name}...`)
    
        return new Promise( resolve => {
          pool.execute(sql, [name] + '%', (err, resultRow) => {
            console.log(`...found ${JSON.stringify(resultRow)}!`)
    
            const project = new project(resultRow.name, resultRow.description, resultRow.startdate, resultRow.deadline)
            project.name = resultRow.name
            resolve(project);
          })
        })  
    }

}

module.exports = project;