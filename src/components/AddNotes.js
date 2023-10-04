import React,{useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addNotes } = context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const { showAlert } = props;
    const handleChange = (e)=>{
        setNote ({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e) => {
        e.preventDefault()
        addNotes(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Notes Added successfully", "success");
    };
  return (
    <div>
      <div className="container my-3">
    <h1 className="my-3">Add Notes</h1>
      <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name='title' value={note.title} id="title" aria-describedby="emailHelp" onChange={handleChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name='description' value={note.description} id="description" onChange={handleChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleChange}/>
          </div>
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>AddNote</button>
      </form>
      </div>
    </div>
  )
}

export default AddNotes
