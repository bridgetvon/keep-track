const mysql = require('mysql2');


//connect to mysql database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'bridgetcodes',
        database: 'employees'
    },
    console.log('connected to database')
);

db.connect(function (err) {
    if (err) throw err;
    console.log(err);
});

module.exports = db;