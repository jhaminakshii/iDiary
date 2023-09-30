
const express = require("express");
const fetchUserData = require("../middleware/fetchuserdata");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//  Route 1 : Fetch all notes using :GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes", fetchUserData, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//  Route 2 : Add a new note using :POST '/api/notes/addnote'. Login required
router.post(
  "/addnote",
  fetchUserData,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    // description must be at least 5 chars long
    body("description", "description must be atleast 5 characters").isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const {title,description,tag} = req.body ;
      // if there are error return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let note = new Notes({
        title,description,tag,user:req.user.id
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//  Route 3 : Update an existing note using : PUT '/api/notes/updatenode'. Login required
router.put(
  "/updatenote/:id",
  fetchUserData,
  async (req, res) => {
    try {
      const {title,description,tag} = req.body ;
      // creating a new note object
      const newNote = {};
      if (title){newNote.title=title};
      if (description){newNote.description = description;};
      if (tag){newNote.tag=tag};

      //find the note to be updated and update it
      let note = await Notes.findById(req.params.id) ;
      if (!note) {
        return res.status(404).send('Not found');
      }
      if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote},{new:true})
      res.json({note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;