import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Note = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
  return (
    <div>
      <div className="container my-3 row">
        <h1 className="my-3">Your Notes</h1>
        {notes.map((note) => {
        return <NoteItems note={note}/>
        })}
      </div>
    </div>
  );
};

export default Note;
