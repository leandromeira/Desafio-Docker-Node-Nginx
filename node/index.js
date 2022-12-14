const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values('Leandro Meira')`
connection.query(sql)
connection.connect((err) => {
    let query = 'SELECT name FROM people';
    connection.query(query, (err, rows) => {  
        app.get('/', (req, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.write('<h1>Full Cycle Rocks!</h1>')
            for( i=0; i<rows.length; i++ ) {
                res.write("- "+rows[i].name+ "<br/>");
            }            
            res.end();
        })
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`))    

