import React, { useRef, useState } from "react";
import { INote } from "../interface/notes";
import { NewNote } from ".";
import { AiFillDelete } from "react-icons/ai";

interface NoteItem {
  note: INote;
  changeNotes?: (note: INote) => void;
  deleteNote?: (note: string) => void;
}

const NoteItem: React.FC<NoteItem> = ({ note, changeNotes, deleteNote }) => {
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
  const delNote = (id: string) => {
    if (deleteNote) deleteNote(id);
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
          <div className="activeCard">
            <span>{currentNote.date}</span>
            <button
              className="activeButton"
              onClick={() => delNote(currentNote.id)}
            >
              <AiFillDelete size={20} />
            </button>
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
