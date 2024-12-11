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
  Snackbar,
  Alert,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function Notes() {
  const [notes, setNotes] = useState([]); // Array to store all notes
  const [newNoteTitle, setNewNoteTitle] = useState(''); // Title for a new note
  const [newNoteContent, setNewNoteContent] = useState(''); // Content for a new note
  const [editingIndex, setEditingIndex] = useState(null); // Index of the note being edited
  const [editingTitle, setEditingTitle] = useState(''); // Title of the note being edited
  const [editingContent, setEditingContent] = useState(''); // Content of the note being edited
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controls the visibility of the edit dialog
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controls Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for the Snackbar

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

    // Show the Snackbar notification
    setSnackbarMessage("Note added successfully!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <AppBar position="static" sx={{ backgroundColor: "#5fc4d2" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: "#ffffff", fontWeight: "bold" }}
              >
                ZotMate
              </Typography>
              <Box sx={{ marginLeft: 15, display: "flex", gap: 3 }}>
                <Button
                  color="inherit"
                  component={Link}
                  href="/"
                  sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Home
                  <HomeIcon sx={{ ml: 0.5 }} />
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/todo-list"
                  sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                >
                  To-Do List
                  <ListIcon sx={{ ml: 0.5 }} />
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/notes"
                  sx={{ color: "#FFFFFF", fontWeight: "bold" }}
                >
                  Notes
                  <EditNoteIcon sx={{ ml: 0.5 }} />
                </Button>
              </Box>
            </Box>
            <SignedOut>
              <Button
                color="inherit"
                component={Link}
                href="/sign-up"
                sx={{
                  ml: 2,
                  borderRadius: "8px",
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
              >
                Get Started
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/sign-in"
                sx={{
                  ml: 2,
                  borderRadius: "8px",
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                  paddingLeft: 3,
                  paddingRight: 3,
                }}
              >
                Sign In
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ pt: 4, maxWidth: '800px', mx: 'auto' }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
            Notes
          </Typography>
          <Box sx={{ mb: 2 }}>
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
              variant="outlined"
              onClick={handleAddNote}
              sx={{
                color: '#5fc4d2',
                borderColor: "#5fc4d2",
                borderRadius: "8px",
                padding: 1.5,
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#5fc4d2",
                },
              }}
            >
              Add Note
            </Button>
          </Box>
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
                <ListItemText
                  primary={note.title}
                  secondary={`${note.content} (Created on: ${note.date})`}
                />
                <Box>
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
        </Box>
      </Container>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2, bgcolor: '#ffffff' }}
          />
          <TextField
            label="Content"
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ bgcolor: '#ffffff' }}
          />
        </DialogContent>
        <DialogActions>
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
