// set up dependencies and requirements
const express = require('express');
const app = express();
const { notes } = require('./db/notes');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

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
    try {
        noteData = fs.readFileSync('./db/notes.json', 'utf8');
        noteData = JSON.parse(createNoteData);
        req.body.id = noteData.length;
        noteData.push(req.body);
        noteData = JSON.stringify(noteData);
        fs.writeFile('./db/notes.json', noteData, 'utf8', (err) => {
            if (err) throw err;
        });
        res.json(JSON.parse(noteData));
    } catch (err) {
        throw err;
    }
});

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
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});