const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//adding the GET /notes route for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

//adding the GET /api/notes route for the db.json file contents

//READ FROM DB.JSON FILE

app.get("/api/notes", (req, res) => {
    // console.log('retrieving notes');
    res.json(loadNotes())
}); 

//adding the DELETE /api/notes route for the db.json file contents
app.delete("/api/notes/:id", (req, res) => {
//    console.log(req.params.id);
   deleteNote(req.params.id);
    res.send();
});

// adding the POST /api/notes route for the db.json file contents
app.post("/api/notes", (req, res) => {
	//read the request body in as a JSON note
    const newNote = req.body;
	//add an id to the JSON note
    newNote.id = new Date().valueOf();
	//read my old notes into an array
    const notes = loadNotes();
	//add my new note to the array
    notes.push(newNote);
	//save the old notes, plus the new note, to the db.json file
    saveNotes(notes);
	//send the new note back to the caller
    res.send(newNote);
});

//adding the GET * route for index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
const loadNotes = () => {
    let fileContents = fs.readFileSync("./db/db.json", "utf8")
    console.log(fileContents);
    if (fileContents.length != 0) {
        return (JSON.parse(fileContents));
    } else { 
        return []
     };
};
const deleteNote = (id) => {
    const notes = loadNotes();
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            notes.splice(i, 1);
        }
    }
    saveNotes(notes);
}
const saveNotes = (notes) => {
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) console.log(err);
    });
};