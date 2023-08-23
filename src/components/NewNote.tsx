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
  textik = { text: "" },
  changeCurrent,
  changeNotes,
}) => {
  const [text, setText] = useState<string>(textik.text);
  const [remainsLetters, setRemainsLetters] = useState<number>(200);
  const textAreaRefik = useRef<HTMLTextAreaElement>(null);

  const date = new Intl.DateTimeFormat().format(new Date());

  const typeText = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    if (
      (value.length < text.length || remainsLetters > 0) &&
      value.length <= 200
    ) {
      setText(value);
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
    setRemainsLetters(200 - text.length);
  }, [text]);

  const createNewNote = (): void => {
    const newNote: INote = {
      id: textik.id || nanoid(),
      text: text,
      date: date.toLocaleString(),
    };
    if (createNote) createNote(newNote);
    if (changeCurrent && changeNotes) {
      changeCurrent(text);
      changeNotes(newNote);
    }
    setText("");
  };

  return (
    <div className="container">
      <textarea
        ref={textAreaRefik}
        className="newItem"
        placeholder="Введите заметку..."
        value={text}
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
