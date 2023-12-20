const mysql = require('mysql2/promise');

// MySQL database configuration
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'MikiVit',
  password: 'Fonjm4uoKbLY!#ZpNuWj',
  database: 'motoveles'

};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  connection.release();
});

module.exports = pool;
