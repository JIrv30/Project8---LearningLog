import React from "react";
import { useState, useEffect } from "react";

export default function Admin (props) {
  
  const [selectedUser, setSelectedUser] = useState('')


  const userListElements = props.uniqueUsers.map(note=>(
    <p 
    key={note}
    onClick={()=>setSelectedUser(note)}
    className={`${ note===selectedUser ? 'selected-user' : ''}`}
    >{note}
    </p>
  ))

  const userNoteElements = props.notes.map(note =>(
    note.displayName===selectedUser ?    
    <p key={note.id}>{note.body}</p>
    : null
  ))

  

  return(
    <div className="Admin-console">
      {/* <button onClick={props.switch}>Switch to Learning Log</button> */}
      <div className="unique-users">
      {userListElements}
      </div>
      <div className="user-notes">
      {userNoteElements}
      </div>

    </div>
  )
}