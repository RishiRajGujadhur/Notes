import React, { useState } from 'react';
import { List, Button } from '@mui/material';
import NoteDetails from './NoteDetails';
import NoteForm from './NoteForm';
import { Note } from '../Interfaces/Note';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { ExpandMore } from '@mui/icons-material';
import Paper from '@mui/material/Paper';

interface NoteListProps {
  notes: Note[];
  onDelete: (noteId: number) => void;
  onEdit: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete, onEdit }) => {

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false); // New state to track if creating a new note

  const handleViewDetails = (note: Note) => {
    setSelectedNote(note);
    setIsDetailsOpen(true);
  };
  const handleAddNote = () => {
    setIsCreatingNew(true);
  };

  const handleCloseForm = () => {
    setIsCreatingNew(false); // Close the form
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <List>
          {notes.map((note) => (
            <Paper elevation={3}>
              <Card key={note.id} sx={{ mb: 2 }}>
                {/* <ListItem key={note.id} disableGutters> */}
                <CardContent>
                  <Typography variant="h6">{note.title}</Typography>
                </CardContent>

                <CardActions disableSpacing> {/* Removes default action spacing */}
                  <IconButton
                    onClick={() => handleViewDetails(note)}
                    aria-label="show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </CardActions>
                {/* </ListItem> */}
              </Card>
            </Paper>
          ))}

          {/* Conditionally Render NoteDetails */}
          {isDetailsOpen && selectedNote && (
            <NoteDetails
              note={selectedNote}
              onDelete={() => onDelete(selectedNote.id)}
              onEdit={() => onEdit(selectedNote)}
            />
          )}
        </List>
      </Grid>
      {/* Add New Note Button */}
      <Grid item xs={12} md={4}>
        <Button variant="contained" fullWidth onClick={handleAddNote}>Add New Note</Button>
        {isCreatingNew && (
          <NoteForm onClose={handleCloseForm} />
        )}
      </Grid>
    </Grid>
  );
};

export default NoteList;