import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, Snackbar, ButtonGroup } from '@mui/material';
import NoteForm from './NoteForm';
import agent from '../app/api/agent';
import { Note } from '../Interfaces/Note'; 

interface NoteDetailsProps {
  note: Note;
  onDelete?: () => void;
  onEdit?: () => void;
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  const handleDelete = async () => {
    try {
      await agent.Notes.delete(note.id); // Use agent for deletion
      onDelete?.();
      setIsSnackbarOpen(true);
      setSnackbarMessage('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      setIsSnackbarOpen(true);
      setSnackbarMessage('Error deleting note. Please try again.');
    }
  };

  const handleConfirmDelete = () => {
    handleDelete();
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ p: 2 }}> {/* Adds padding */}
        <Grid item xs={12}>
          <Typography variant="h6">{note.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography> {note.content} </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button variant="contained" onClick={handleEdit}>Edit</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsDeleteDialogOpen(true)} // Set state to open dialog
            >Delete</Button>
          </ButtonGroup>
        </Grid>
        {/* Edit Modal */}
        {isEditing && (
          <NoteForm note={note} onClose={handleCloseEditModal} />
        )}

        {/* Delete Confirmation Dialog */}
        {isDeleteDialogOpen && (
          <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
            <DialogTitle>Delete Note?</DialogTitle>
            <DialogContent>Are you sure you want to delete this note?</DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="error">Delete</Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        message={snackbarMessage}
        autoHideDuration={3000} // Snackbar closes after 3 seconds
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default NoteDetails;