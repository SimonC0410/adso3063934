const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./territorio.sqlite');

db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ciudades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL,
        departamento TEXT,
        poblacion INTEGER,
        region TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS equipos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT UNIQUE NOT NULL,
        id_ciudad INTEGER,
        estadio TEXT,
        titulos INTEGER DEFAULT 0,
        FOREIGN KEY (id_ciudad) REFERENCES ciudades(id)
    )`);
});

module.exports = db;