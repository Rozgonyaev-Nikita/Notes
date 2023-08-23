import React from "react";
import { NewNote, NoteItem } from ".";
import { INote } from "../interface/notes";

interface INotesList {
  notes: INote[];
  createNote: (note: INote) => void;
  changeNotes: (notes: INote) => void;
}

const NotesList: React.FC<INotesList> = ({
  notes,
  createNote,
  changeNotes,
}) => {
  return (
    <div className="containerList">
      {notes.map((note) => (
        <NoteItem
          note={note}
          key={note.id}
          changeNotes={changeNotes}
        ></NoteItem>
      ))}
      <NewNote createNote={createNote}></NewNote>
    </div>
  );
};

export default NotesList;
