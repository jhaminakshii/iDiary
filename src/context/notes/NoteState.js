import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Get all notes
  const getNotes = async () => {
    //API call
    //let url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNzBkODhmYTUwNTYyYjM0MGNhMDJiIn0sImlhdCI6MTY5NjAxMDQwOX0.yqCQi0UIPyDPKiJbEFrYeYw2hwl5Hr1_5yhfoC8upYY",
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add notes
  const addNotes = async (title, description, tag) => {
    //API call
    //let url = `${host}api/notes/addnote`;
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNzBkODhmYTUwNTYyYjM0MGNhMDJiIn0sImlhdCI6MTY5NjAxMDQwOX0.yqCQi0UIPyDPKiJbEFrYeYw2hwl5Hr1_5yhfoC8upYY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };
  // Edit notes
  const editNotes = async (id, title, description, tag) => {
    //let url = `${host}api/notes/updatenote/${id}`;
    //API call
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          
          "Content-Type": "application/json",
         'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNzBkODhmYTUwNTYyYjM0MGNhMDJiIn0sImlhdCI6MTY5NjAxMDQwOX0.yqCQi0UIPyDPKiJbEFrYeYw2hwl5Hr1_5yhfoC8upYY'

    },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    console.log(json)
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(id,notes)
    setNotes(newNotes);
  }
  // Delete notes
  const deleteNotes = async (id) => {
    // console.log('deleting note' + id)
    //API call

    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNzBkODhmYTUwNTYyYjM0MGNhMDJiIn0sImlhdCI6MTY5NjAxMDQwOX0.yqCQi0UIPyDPKiJbEFrYeYw2hwl5Hr1_5yhfoC8upYY",
      }
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNotes, editNotes, deleteNotes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );

}

export default NoteState;