const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".agregar-nota");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("notitas") || "[]");
}

function guardaNotas(notes) {
  localStorage.setItem("notitas", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Título de la nota. Agrega una derscripción en este post it";
  

  element.addEventListener("change", () => {
    updateNote(id, element.value);  
  });

  element.addEventListener("dblclick", () => {
    const doDelete = (
      "¿Está seguro que desea eliminar esta nota?"
    );

    if (doDelete) {
      borrarNota(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  guardaNotas(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id = id)[0];

  targetNote.content = newContent;
  guardaNotas(notes);
}

function borrarNota(id, element) {
  const notes = getNotes().filter((note) => note.id = id);

  guardaNotas(notes);
  notesContainer.removeChild(element);
}
