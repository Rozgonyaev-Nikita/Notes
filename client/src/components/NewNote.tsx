import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { INote } from "../interface/notes";
import { nanoid } from "nanoid";

interface INewNote {
  createNote?: (note: INote) => void;
  textik?: INote;
  changeCurrent?: (text: string) => void;
  ref?: HTMLTextAreaElement;
  changeNotes?: (note: INote) => void;
}

const NewNote: React.FC<INewNote> = ({
  createNote,
  textik = { id: "", text: "", date: "" },
  changeCurrent,
  changeNotes,
}) => {
  const [note, setNote] = useState<INote>(textik);
  const [remainsLetters, setRemainsLetters] = useState<number>(200);
  const textAreaRefik = useRef<HTMLTextAreaElement>(null);

  // const date = new Intl.DateTimeFormat().format(new Date());
  const currentDate = new Date();
  const date = currentDate.toLocaleString();

  const typeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    if (
      (value.length < note.text.length || remainsLetters > 0) &&
      value.length <= 200
    ) {
      setNote({ ...note, text: value });
    }
  };

  useEffect(() => {
    textAreaRefik?.current?.setSelectionRange(
      textAreaRefik.current.value.length,
      textAreaRefik.current.value.length
    );
    textAreaRefik?.current?.focus();
  }, []);
  useEffect(() => {
    setRemainsLetters(200 - note.text.length);
  }, [note.text]);

  const createNewNote = (): void => {
    const newNote: INote = {
      id: note.id || nanoid(),
      text: note.text,
      date: date.toLocaleString(),
    };
    if (createNote) createNote(newNote);
    if (changeCurrent && changeNotes) {
      changeCurrent(note.text);
      changeNotes(newNote);
    }
    setNote({ ...note, text: "" });
  };

  return (
    <div className="container">
      <textarea
        ref={textAreaRefik}
        className="newItem"
        placeholder="Введите заметку..."
        value={note.text}
        onChange={typeText}
        onBlur={createNewNote}
      ></textarea>
      <div className="activeCard">
        <span>{remainsLetters} символов осталось</span>
        <button className="saveButton" onClick={createNewNote}>
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default NewNote;
