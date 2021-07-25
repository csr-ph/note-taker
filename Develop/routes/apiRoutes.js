const router = require('express').Router();
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

let noteData = require('../db/notes');
const store = require('../db/store');

router.get('/notes', (err, res) => {
    res.json(noteData);
});

// route for adding a new note

router.post('/notes', (req, res) => {
    res.send(note);
    store.newNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;