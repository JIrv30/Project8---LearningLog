import React from "react"
import Split from "react-split"
// import firebase from 'firebase/app'
import "firebase/auth"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import {useAuthState} from 'react-firebase-hooks/auth'
import { notesCollection, db, auth } from "../firebase"
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const [tempNoteText, setTempNoteText] = React.useState('')

    

    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    const sortedNotes = notes.sort((a,b)=> b.updatedAt - a.updatedAt)

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])

    React.useEffect(() => {
        if(!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect(()=>{
        if(currentNote) {
            setTempNoteText(currentNote.body)
        }
        
    },[currentNote])


    //debouncing function - useeffect runs everytime tempNoteText changes (on every key stroke), however setTimeout is set to 500ms.  So Useeffect will Clean up with the return function which runs cleartimeout and cancels the old settimeout. React will then run the whole function again.
    
    // if function prevents just clicking on  a note moving it to the top.  Without this when you select a note you are adding information to updatedAt (in the updateNote function below).  This caused it to jump to the top.

    // only when a full 500ms has passed will the settimeout function run causing tempNoteText to upate and send the note to Firestore.

    //this saves a huge amount of writes to the database
    React.useEffect (() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
            
        },500)
        return () => clearTimeout(timeoutId)
    },[tempNoteText])


    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) {
        const docRef = doc(db, 'notes', currentNoteId)
        await setDoc(
            docRef, 
            {body: text, updatedAt: Date.now()}, 
            {merge: true})
    }

    async function deleteNote(noteId) {
        const docRef = doc(db, 'notes', noteId)
        await deleteDoc(docRef)
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNoteText={setTempNoteText}
                            />
                    </Split>
                    :
                    <div className="no-notes">
                        {user ? <section>
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}>
                        Create one now
                        </button>
                        </section> : SignIn}
                        
                    </div>

            }
        </main>
    )
          }
 
  function SignIn() {
    const signInWithGoogle = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  
  return(
    <button
      className="signInWithGoogle"
      onClick={signInWithGoogle}>Sign in with Google
    </button>)
    }
  
  

  function SignOut () {
    return auth.currentUser && (
    <button
    className="sign-out"
    onClick={()=> auth.signOut()}>
      Sign Out
    </button>)
  }

  export default App

    // return (
    //   <>
    //   Something
    //   </>
    // )
