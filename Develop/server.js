// set up dependencies and requirements
const express = require('express');
const app = express();
const { notes } = require('./db/notes');
const path = require('path');
const fs = require('fs');

// create a blank array to store notes
let noteData = [];

app.use(express.urlencoded({ extended: true }));

// set up middleware for front end
app.use(express.static('public'));

// middleware for json handling
app.use(express.json());

// route for getting notes from json as array of objects
app.get('/api/notes', (err, res) => {
    try {
        noteData = fs.readFileSync('db/notes.json', 'utf8');
        noteData = JSON.parse(noteData);
    } catch (err) {
        console.log('An Error Has Occurred: ' + err);
    }
    res.json(noteData);
});

// route for adding a new note
app.post('/api/notes', (req, res) => {

})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "db/notes.json"));
});

// route for serving notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// route to serve up index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// wildcard for nonexistent pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//set up listener for server
app.listen(3001, () => {
    console.log('Now listening on port 3001');
});