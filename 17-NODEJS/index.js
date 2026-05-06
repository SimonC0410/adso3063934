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
 
// manga
 
// GET: /manga
app.get('/manga', auth, (req, res) => {
    db.all(`SELECT * FROM mangas`, [], (err, rows) => {
        res.json(rows);
    });
});

// GET: /manga/:id
app.get('/manga/:id', auth, (req, res) => {
    db.get(`SELECT * FROM mangas WHERE id = ?`, [req.params.id], (err, row) => {
        if(err || !row) return res.status(404).json({error: 'Not found!'});
        res.json(row);
    });
});

// POST: /manga
app.post('/manga', auth, (req, res) => {
    const {title, author, volumes} = req.body;
    db.run(`INSERT INTO mangas (title, author, volumes)
            VALUES(?, ?, ?)`, [title, author, volumes], (err) => {
                if(err) return res.status(400).json({error: 'Already exists!'});
                res.json({message: 'Created!'});
            }
    );
});

// PUT: /manga/:id
app.put('/manga/:id', auth, (req, res) => {
    const {title, author, volumes} = req.body;
    db.run(`UPDATE mangas SET title = ?, author = ?, volumes = ?
            WHERE id = ?`, [title, author, volumes, req.params.id], (err) => {
                if(err) return res.status(400).json({error: 'Error updating!'});
                res.json({message: 'Updated!'});
            }
    );
});

// DELETE: /manga/:id
app.delete('/manga/:id', auth, (req, res) => {
    db.run(`DELETE FROM mangas WHERE id = ?`, [req.params.id], (err) => {
        if(err) return res.status(400).json({error: 'Error deleting!'});
        res.json({message: 'Deleted!'});
    });
});
 
app.listen(3000, () => console.log('Server running on http://localhost:3000'))