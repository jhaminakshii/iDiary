import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const initialNotes = [
      {
        _id: "6517144b4f1e490ba2713c48",
        user: "65170d88fa50562b340ca02b",
        title: "javascript and reactjs",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-29T18:15:39.601Z",
        __v: 0,
      },
      {
        _id: "651828ac2998ba0288266ad2",
        user: "65170d88fa50562b340ca02b",
        title: "second note",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-30T13:54:52.457Z",
        __v: 0,
      },
      {
        _id: "651828b62998ba0288266ad4",
        user: "65170d88fa50562b340ca02b",
        title: "third note",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-30T13:55:02.468Z",
        __v: 0,
      },
      {
        _id: "6517144b4f1e490ba2713c48",
        user: "65170d88fa50562b340ca02b",
        title: "javascript and reactjs",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-29T18:15:39.601Z",
        __v: 0,
      },
      {
        _id: "651828ac2998ba0288266ad2",
        user: "65170d88fa50562b340ca02b",
        title: "second note",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-30T13:54:52.457Z",
        __v: 0,
      },
      {
        _id: "651828b62998ba0288266ad4",
        user: "65170d88fa50562b340ca02b",
        title: "third note",
        description: "must be finished within week",
        tag: "personal notes",
        date: "2023-09-30T13:55:02.468Z",
        __v: 0,
      },
    ];
   const [notes,setNotes] = useState(initialNotes);

return (
  <NoteContext.Provider value={{notes,setNotes}}>
    {props.children}
  </NoteContext.Provider>
);

}

export default NoteState;