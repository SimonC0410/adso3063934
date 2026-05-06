const sqlite3 = require('sqlite3').verbose();
const db      = new sqlite3.Database('./mangadb.sqlite');
 
db.serialize(() => {
    // Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT    
    )`);
    
    // Mangas Table
    db.run(`CREATE TABLE IF NOT EXISTS mangas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT UNIQUE,
        author TEXT,
        volumes INTEGER    
    )`);
});
 
module.exports = db;
 