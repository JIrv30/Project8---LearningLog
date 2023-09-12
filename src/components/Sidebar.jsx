import React from "react"
import { UserAuth } from "../context/AuthContext"

export default function Sidebar(props) {
    const {logOut, user} = UserAuth();
    
    const handleSignOut = async () => {
        try {await logOut()
        } catch (error) {console.log(error)}
      }
    
    

    const noteElements = props.notes.map((note) => (note.userid === props.currentUser ? 

        <div key={note.id}>
             <div
            className={`title ${
                note.id === props.currentNote.id ? "selected-note" : ""
            }`}
            onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button 
                    className="delete-btn"
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div> : null
    )
    )
// console.log(props)
    return (
        <section className="pane sidebar">
            <button onClick={props.switchToAdmin}>Switch to Admin</button>
            <div className="sidebar--header">

                
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
