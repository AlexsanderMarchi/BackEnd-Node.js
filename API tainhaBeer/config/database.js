const pg = require("pg");
const database = new pg.Client("URL");

module.exports=database;