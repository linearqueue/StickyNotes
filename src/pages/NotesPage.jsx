import { fakeData as notes } from "../assets/fakeData.js";
import NoteCard from "../components/NoteCard.jsx";

const NotesPage = () => {
  return (
    <>
      {notes.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
    </>
  );
};

export default NotesPage;
