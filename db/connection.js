const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
}

const db = mysql.createConnection(dbConfig);

const WIPE_INVENTORY_SQL = `DELETE FROM Items;`;
const wipeInventory = () => db.execute(WIPE_INVENTORY_SQL);
const INSERT_INTO_INVENTORY_SQL = `
INSERT INTO Items
    (name, quantity, description)
VALUES
    (?, ?, ?);`
const insertIntoInventory = (name, quantity, description) => {
    db.execute(INSERT_INTO_INVENTORY_SQL, [
        name, quantity, description
    ]);
}
const READ_INVENTORY_SQL = `SELECT * FROM Items`;
const readAllInventory = (callback) => {
    return db.execute(READ_INVENTORY_SQL, callback);
}

module.exports = {};

module.exports.wipe = wipeInventory;
module.exports.insert = insertIntoInventory;
module.exports.readAll = readAllInventory;
module.exports.disconnect = () => db.end();