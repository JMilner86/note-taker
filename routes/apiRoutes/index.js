const fs = require('fs');
const router = require('express').Router();
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


router.get("/notes", (req, res) => {
   req.readFileAsync('./db/db.json', "utf-8").then(function(data){
      const notes = [].concat(JSON.parse(data))
      res.json(notes);
  })
  });

router.post("/notes", (req, res) => {
    const note = req.body
    readFileAsync('./db/db.json', "utf-8").then(function(data){
    const notes = [].concat(JSON.parse(data))
    note.id = notes.length + 1;
    notes.push(note);
    return notes   
    })

    .then(function (notes) {
    writeFileAsync('./db/db.json', "utf-8", JSON.stringify(notes))
    res.json(notes); 
    })
});
  



module.exports = router;