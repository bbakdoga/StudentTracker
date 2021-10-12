//const mysql = require('mysql2/promise');
var mariadb = require('mariadb');
var config = require('../config');

let connection;

async function query(sql, values) {

  if(!connection){
    connection = await mariadb.createConnection(config.db);
  }
  const  results  = await connection.query(sql, values);
  return results;
}

module.exports = {
  query
}