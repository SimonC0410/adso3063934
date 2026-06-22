const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const db      = require('./database');
const auth    = require('./authMiddleware');
 
const app = express();
app.use(express.json());
app.use(cors());
 
const SECRET_KEY = 'your_secret';
 
// AUTH ENDPOINTS:
// POST: /register
app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
 
    db.run(`INSERT INTO users (username, password)
            VALUES(?, ?)`, [username, hashedPassword], (err) => {
                if(err) return res.status(400).json({error: 'User already exists!'});
                res.json({message: 'User Registered!'});
            }    
    );
});
 
// POST: /login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if(err || !user) return res.status(400).json({error: 'User not found!'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({error: 'Invalid password!'});

        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    });
});
 
// =========================
// CIUDADES
// =========================

// GET: todas las ciudades
app.get('/ciudades', auth, (req, res) => {
    db.all(`SELECT * FROM ciudades`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET: ciudad por ID
app.get('/ciudades/:id', auth, (req, res) => {
    db.get(`SELECT * FROM ciudades WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Ciudad no encontrada' });
        res.json(row);
    });
});

// POST: crear ciudad
app.post('/ciudades', auth, (req, res) => {
    const { nombre, departamento, poblacion, region } = req.body;

    db.run(
        `INSERT INTO ciudades (nombre, departamento, poblacion, region)
         VALUES (?, ?, ?, ?)`,
        [nombre, departamento, poblacion, region],
        function (err) {
            if (err) return res.status(400).json({ error: 'Error creando ciudad' });
            res.json({ message: 'Ciudad creada', id: this.lastID });
        }
    );
});

// PUT: actualizar ciudad
app.put('/ciudades/:id', auth, (req, res) => {
    const { nombre, departamento, poblacion, region } = req.body;

    db.run(
        `UPDATE ciudades 
         SET nombre = ?, departamento = ?, poblacion = ?, region = ?
         WHERE id = ?`,
        [nombre, departamento, poblacion, region, req.params.id],
        function (err) {
            if (err) return res.status(400).json({ error: 'Error actualizando ciudad' });
            if (this.changes === 0) return res.status(404).json({ error: 'No encontrada' });
            res.json({ message: 'Ciudad actualizada' });
        }
    );
});

// DELETE: eliminar ciudad
app.delete('/ciudades/:id', auth, (req, res) => {
    db.run(`DELETE FROM ciudades WHERE id = ?`, [req.params.id], function (err) {
        if (err) return res.status(400).json({ error: 'Error eliminando ciudad' });
        if (this.changes === 0) return res.status(404).json({ error: 'No encontrada' });
        res.json({ message: 'Ciudad eliminada' });
    });
});





// =========================
// EQUIPOS
// =========================

// GET: todos los equipos (con ciudad)
app.get('/equipos', auth, (req, res) => {
    const query = `
        SELECT equipos.*, ciudades.nombre AS ciudad
        FROM equipos
        LEFT JOIN ciudades ON equipos.id_ciudad = ciudades.id
    `;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET: equipo por ID
app.get('/equipos/:id', auth, (req, res) => {
    const query = `
        SELECT equipos.*, ciudades.nombre AS ciudad
        FROM equipos
        LEFT JOIN ciudades ON equipos.id_ciudad = ciudades.id
        WHERE equipos.id = ?
    `;

    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Equipo no encontrado' });
        res.json(row);
    });
});

// POST: crear equipo
app.post('/equipos', auth, (req, res) => {
    const { nombre, id_ciudad, estadio, titulos } = req.body;

    db.run(
        `INSERT INTO equipos (nombre, id_ciudad, estadio, titulos)
         VALUES (?, ?, ?, ?)`,
        [nombre, id_ciudad, estadio, titulos],
        function (err) {
            if (err) return res.status(400).json({ error: 'Error creando equipo' });
            res.json({ message: 'Equipo creado', id: this.lastID });
        }
    );
});

// PUT: actualizar equipo
app.put('/equipos/:id', auth, (req, res) => {
    const { nombre, id_ciudad, estadio, titulos } = req.body;

    db.run(
        `UPDATE equipos 
         SET nombre = ?, id_ciudad = ?, estadio = ?, titulos = ?
         WHERE id = ?`,
        [nombre, id_ciudad, estadio, titulos, req.params.id],
        function (err) {
            if (err) return res.status(400).json({ error: 'Error actualizando equipo' });
            if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
            res.json({ message: 'Equipo actualizado' });
        }
    );
});

// DELETE: eliminar equipo
app.delete('/equipos/:id', auth, (req, res) => {
    db.run(`DELETE FROM equipos WHERE id = ?`, [req.params.id], function (err) {
        if (err) return res.status(400).json({ error: 'Error eliminando equipo' });
        if (this.changes === 0) return res.status(404).json({ error: 'No encontrado' });
        res.json({ message: 'Equipo eliminado' });
    });
});
 
app.listen(3000, () => console.log('Server running on http://localhost:3000'))