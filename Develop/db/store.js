const fs = require('fs');
const util = require('util');

let noteData = require('../db/notes');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    write(note) {
        return writeFile(noteData, JSON.stringify(note));
    }

    getAllNotes() {
        return readFile(noteData).then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    newNote(note) {
        const { title, text } = note;

        const createNote = { title, text };

        return this.getAllNotes()
        .then((notes) => [...notes, createNote])
        .then((refreshedNotes) => this.write(refreshedNotes))
        .then(() => createNote);
    }
}

module.exports = new Store();