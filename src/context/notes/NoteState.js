import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
let s1 = {
    'name':"mini",
    "age":30
}
const [state,setState] = useState(s1);
const update = ()=>{
    setTimeout(() => {
        setState({
          "name": "abhi",
          "age": 34,
        });
    }, 4000);
}

return (
  <NoteContext.Provider value={{ state , update }}>
    {props.children}
  </NoteContext.Provider>
);

}

export default NoteState;