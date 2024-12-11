'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function Notes() {
  // State variables for managing notes
  const [notes, setNotes] = useState([]); // Array to store all notes
  const [newNoteTitle, setNewNoteTitle] = useState(''); // Title for a new note
  const [newNoteContent, setNewNoteContent] = useState(''); // Content for a new note
  const [editingIndex, setEditingIndex] = useState(null); // Index of the note being edited
  const [editingTitle, setEditingTitle] = useState(''); // Title of the note being edited
  const [editingContent, setEditingContent] = useState(''); // Content of the note being edited
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls the visibility of the edit dialog

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Function to add a new note
  const handleAddNote = () => {
    // Validate inputs
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      alert('Title and content cannot be empty!');
      return;
    }
    // Create a new note object
    const newNote = {
      title: newNoteTitle,
      content: newNoteContent,
      date: new Date().toLocaleDateString(), // Add current date
    };
    // Add the new note to the notes array
    setNotes([...notes, newNote]);
    // Clear input fields
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    // Remove the note at the specified index
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Function to start editing a note
  const handleEditNote = (index) => {
    const note = notes[index];
    setEditingIndex(index); // Set the index of the note being edited
    setEditingTitle(note.title); // Pre-fill the title input
    setEditingContent(note.content); // Pre-fill the content input
    setIsDialogOpen(true); // Open the dialog
  };

  // Function to save changes to an edited note
  const handleSaveEdit = () => {
    // Update the edited note in the notes array
    const updatedNotes = notes.map((note, index) =>
      index === editingIndex
        ? { ...note, title: editingTitle, content: editingContent }
        : note
    );
    setNotes(updatedNotes);
    // Reset state and close the dialog
    setEditingIndex(null);
    setEditingTitle('');
    setEditingContent('');
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', minHeight: '100vh', pb: 4 }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#5fc4d2' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ color: '#ffffff' }}>
                Zotmate - Digital Assistant for UCI
              </Typography>
              <Button color="inherit" component={Link} href="/" sx={{ ml: 2, color: '#ffffff' }}>
                Home
                <HomeIcon sx={{ ml: 0.5 }} />
              </Button>
              <Button color="inherit" component={Link} href="/todo-list" sx={{ ml: 2, color: '#ffffff' }}>
                To-Do List
                <ListIcon sx={{ ml: 0.5 }} />
              </Button>
              <Button color="inherit" component={Link} href="/notes" sx={{ ml: 2, color: '#ffffff' }}>
                Notes
                <EditNoteIcon sx={{ ml: 0.5 }} />
              </Button>
            </Box>
            <SignedOut>
              <Button color="inherit" component={Link} href="/sign-up" sx={{ color: '#ffffff' }}>
                Get Started
              </Button>
              <Button color="inherit" component={Link} href="/sign-in" sx={{ color: '#ffffff' }}>
                Sign In
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notes Content */}
      <Container sx={{ pt: 4, maxWidth: '800px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Notes
        </Typography>
        <Box sx={{ mb: 2 }}>
          {/* Input fields for adding a new note */}
          <TextField
            label="Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            fullWidth
            sx={{ bgcolor: '#ffffff', mb: 2 }}
          />
          <TextField
            label="Content"
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ bgcolor: '#ffffff', mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddNote}
            sx={{ backgroundColor: '#5fc4d2', color: '#ffffff' }}
          >
            Add Note
          </Button>
        </Box>
        {/* Display the list of notes */}
        <List>
          {notes.map((note, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: '#f0f0f0',
                mb: 1,
                borderRadius: 1,
              }}
            >
              {/* Display note details */}
              <ListItemText
                primary={note.title}
                secondary={`${note.content} (Created on: ${note.date})`}
              />
              <Box>
                {/* Buttons for editing and deleting a note */}
                <IconButton onClick={() => handleEditNote(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteNote(index)}>
                  <Delete />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>

      {/* Edit Note Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          {/* Input field for editing the title */}
          <TextField
            label="Title"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, bgcolor: '#ffffff' }} // Added background color and spacing
          />
          {/* Input field for editing the content */}
          <TextField
            label="Content"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ bgcolor: '#ffffff' }} // Added background color
          />
        </DialogContent>
        
        <DialogActions>
          {/* Buttons to save or cancel editing */}
          <Button onClick={handleSaveEdit} sx={{ backgroundColor: '#5fc4d2', color: '#ffffff' }}>
            Save
          </Button>
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
