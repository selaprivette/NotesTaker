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
    console.log('retrieving notes');
    res.json(readJSON())
}); 

//adding the DELETE /api/notes route for the db.json file contents
// app.delete("/api/notes/:id", (req, res) => {
//     deleteNote(req.params.id)
//     res.send();
// });

//adding the POST /api/notes route for the db.json file contents
// app.post("/api/notes", (req, res) => {
// 	const newNote
// 	saveNote(newNote);
//     res.send(newNote);
// });

//adding the GET * route for index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
const readJSON = () => {
    let fileContents = fs.readFileSync("./db/db.json", "utf8")
    console.log(fileContents);
    if (fileContents.length != 0) {
        return (JSON.parse(fileContents));
    } else { 
        return []
     };
};