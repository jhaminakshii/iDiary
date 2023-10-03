import React, { useContext, useEffect,useState,useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItems from "./NoteItems";

const Note = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"});

  const ref = useRef(null);
  const closeRef = useRef(null);

    const handleChange = (e)=>{
        setNote ({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e) => {
      console.log(note)
      editNotes(note.id,note.etitle,note.edescription,note.etag);
       closeRef.current.click();
    };
    const updateNote = (currentNote) =>{
      ref.current.click();
      setNote({ id:currentNote._id , etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
  return (
    <div>

      <button type="button" className="btn btn-primary d-none " ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" name='etitle' value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" name='edescription' value={note.edescription} id="edescription" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} />
                </div>
               
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3 row">
        <h1 className="my-3">Your Notes</h1>
        <div className="container my-3 mx-3">
        {notes.length === 0 && 'No notes no display'}
        </div>
        {notes.map((note) => {
          return <NoteItems key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  );
};

export default Note;
