import React, { useState } from "react"
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from "showdown"

export default function Editor({ tempNoteText, setTempNoteText, ...props }) {
    const [selectedTab, setSelectedTab] = React.useState("write")
    

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    const fetchUserText = async () => {
        const userText = await props.currentNote.body
        setTempNoteText(userText)
        setNoteClicked(true)
    }
    

    return (
        
        <section className="pane editor">
            {<ReactMde
                value={props.currentNote.userid===props.currentUser ? tempNoteText : null}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />}
            
        </section>
    )
}
