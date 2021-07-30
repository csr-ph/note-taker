const fs = require('fs');
const util = require('util');

let noteData = require('../db/notes');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFile('db/notes.json', 'utf8');
    }

    write(note) {
        return writeFile('db/notes.json', JSON.stringify(note));
    }

    getAllNotes() {
        return this.read().then((notes) => {
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