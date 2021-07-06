const express = require('express');
const app = express();
const { notes } = require('./db/db');
const path = require('path');

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.listen(3001, () => {
    console.log('Now listening on port 3001');
});