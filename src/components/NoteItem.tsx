import React, { ChangeEvent, useRef, useState } from "react";
import { INote } from "../interface/notes";
import { NewNote } from ".";

interface NoteItem {
  note: INote;
  changeNotes?: (note: INote) => void;
}

const NoteItem: React.FC<NoteItem> = ({ note, changeNotes }) => {
  const [currentNote, setCurrentNote] = useState<INote>(note);
  const [typeNote, setTypeNote] = useState<"currentNote" | "newNote">(
    "currentNote"
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const changeNote = () => {
    setTypeNote("newNote");
    // setCurrentNote({ ...note, text: e.target.value });
    textAreaRef?.current?.focus();
  };

  const changeCurrent = (text: string): void => {
    setTypeNote("currentNote");
    setCurrentNote({ ...note, text: text });
  };

  return (
    <>
      {typeNote === "currentNote" ? (
        <div className="container" onClick={changeNote}>
          <textarea
            ref={textAreaRef}
            className="item"
            readOnly
            value={currentNote.text}
          ></textarea>
          <div>
            <span className="activeCard">{currentNote.date}</span>
          </div>
        </div>
      ) : (
        <NewNote
          changeNotes={changeNotes}
          changeCurrent={changeCurrent}
          textik={currentNote}
        ></NewNote>
      )}
    </>
  );
};

export default NoteItem;
