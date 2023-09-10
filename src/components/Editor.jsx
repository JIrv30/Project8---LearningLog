import React from "react"
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from "showdown"

export default function Editor({ tempNoteText, setTempNoteText, props }) {
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
    }
    
    console.log(selectedTab)
//need to conditional render tempnotetext so only user who is logged in will see it
    return (
        <section className="pane editor">
            
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
            />
        </section>
    )
}
