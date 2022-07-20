const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");
const addNoteButtonImportant = notesContainer.querySelector(".add-note-important")

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

getNotesImportant().forEach((noteimportant) => {
  const noteimportantElement = createNoteElement(noteimportant.id, noteimportant.content);
  notesContainer.insertBefore(noteimportantElement, addNoteButtonImportant);
});
addNoteButtonImportant.addEventListener("click", () => addNoteImportant());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function getNotesImportant() {
  return JSON.parse(localStorage.getItem("stickynotes-notes-important") || "[]");
}
function saveNotesImportant(notesimportant) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notesimportant));
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}



function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Título de la nota. Agrega una derscripción en este post it";
  element.descripcion = "Agrega una derscripción en este post it";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = (
      "¿Está seguro que desea eliminar esta nota?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function createNoteElementImportant(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("noteimportant");
  element.value = content;
  element.placeholder = "Agregue una descripción";


  element.addEventListener("change", () => {
    updateNoteImportant(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = (
      "¿Quiere eliminar esta nota?"
    );

    if (doDelete) {
      deleteNoteImportant(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    "id" : 0, "content": "Agregue una descripción."
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
  saveNotesImportant(notes);
}

function addNoteImportant() {
  const notesimportant = getNotesImportant();
  const noteObject = {
    "id" : 0, "content": "Agregue una descripción."
  };

  const noteElement = createNoteElementImportant(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButtonImportant);

  notesimportant.push(noteObject);
  saveNotes(notesimportant);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function updateNoteImportant(id, newContent) {
  const notesimportant = getNotesImportant();
  const targetNote = notesimportant.filter((noteimportant) => noteimportant.id === id)[0];

  targetNote.content = newContent;
  saveNotes(notesimportant);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}

function deleteNoteImportant(id, element) {
  const notesimportant = getNotesImportant().filter((noteimportant) => noteimportant.id !== id);

  saveNotes(notesimportant);
  notesContainer.removeChild(element);
}