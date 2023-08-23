import React, { useMemo, useState } from "react";
import "./App.css";
import { NotesList } from "./components";
import { INote } from "./interface/notes";
import SearchInput from "./UI/SearchInput/SearchInput";

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const createNote = (newNote: INote) => {
    if (newNote.text.length) setNotes([...notes, newNote]);
  };
  const changeNotes = (newNote: INote) => {
    const index = notes.findIndex((obj) => obj.id === newNote.id);
    if (index !== -1) {
      console.log("text", newNote.text);
      notes.splice(index, 1, { ...newNote, text: newNote.text });
      setNotes([...notes]);
      console.log("cazan", notes);
    }
  };

  const filterNotes = useMemo(() => {
    let filterNot = [...notes];
    if (searchValue) {
      filterNot = [...notes].filter((item) =>
        item.text.toLowerCase().includes(searchValue)
      );

      return filterNot;
    } else {
      return filterNot;
    }
  }, [searchValue, notes]);
  return (
    <>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      ></SearchInput>
      <NotesList
        notes={filterNotes}
        changeNotes={changeNotes}
        createNote={createNote}
      />
    </>
  );
}

export default App;
