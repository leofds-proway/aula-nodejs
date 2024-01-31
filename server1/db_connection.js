const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'teste',
});

module.exports.connect = function() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("DB Connected!");
    });
};

const query = util.promisify(connection.query).bind(connection);

module.exports.query = query;