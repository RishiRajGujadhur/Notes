import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import agent from '../app/api/agent';

interface Note {
  id?: number; // New notes won't have an ID initially
  title: string;
  content: string;
}

const NoteForm: React.FC<{ note?: Note, onClose?: () => void }> = ({ note, onClose }) => {
  const [formData, setFormData] = useState<Note>({ content: note?.content || '', title: note?.title || '' });
  const isEditing = !!note;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const updatedFormData = new FormData(); // Create a new FormData instance here
      updatedFormData.append('content', formData.content);
      updatedFormData.append('title', formData.title);
      if (isEditing && note?.id !== undefined) {
        await agent.Notes.update(note.id, updatedFormData);
      } else {
        await agent.Notes.create(updatedFormData);
      }
      onClose?.();
    }
    catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Enter your note title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Type your note title here..."
        fullWidth
        margin="normal" />

      <TextField
        id="outlined-multiline-static"
        name="content"
        value={formData.content}
        label="Enter your note"
        multiline
        rows={6}
        defaultValue="Default note"
        variant="outlined"
        placeholder="Type your note here..."
        onChange={handleChange}
        maxRows={10}
        minRows={4} />

      <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
    </form>
  );
};

export default NoteForm;
