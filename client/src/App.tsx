import { useEffect, useState } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import { Note } from './Interfaces/Note';
import agent from './app/api/agent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
// ... other imports


function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await agent.Notes.list();
        setNotes(response);
    };
    fetchNotes();

  }, []);

  const handleDeleteNote = async (noteId: number) => {
    try {
      // Remove the note from the UI display. 
      setNotes(notes.filter((n) => n.id !== noteId));  
    } catch (error) {
      console.error('Error deleting note:', error);
      // Handle deletion error
    }
  };

  return (
    <div>
     <AppBar position="static"> 
        <Toolbar>
          <Typography variant="h6">My Notes</Typography>
        </Toolbar>
      </AppBar>

       {/* You might want to add some margin below the AppBar */}
       <Container style={{ marginTop: '64px' }}> 
         <NoteList
           notes={notes}
           onEdit={setSelectedNote} 
           onDelete={handleDeleteNote}
         />
      </Container> 

    </div>
  );
}
export default App;
