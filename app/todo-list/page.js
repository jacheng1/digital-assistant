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
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return alert('Task cannot be empty!');
    setTasks([...tasks, { text: newTask, completed: false, priority }]);
    setNewTask('');
    setPriority('medium');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index].text);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editingIndex ? { ...task, text: editingTask } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingTask('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return false;
  });

  const priorityColors = {
    high: '#ff6347', // Tomato Red
    medium: '#ffcc00', // Yellow
    low: '#90ee90', // Light Green
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

      {/* To-Do List Content */}
      <Container sx={{ pt: 4, maxWidth: '800px', mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          To-Do List
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            fullWidth
            sx={{ bgcolor: '#ffffff', borderRadius: '4px' }}
          />
          <FormControl sx={{ minWidth: 120, bgcolor: '#ffffff', borderRadius: '4px' }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{ backgroundColor: '#5fc4d2', color: '#ffffff' }}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ minWidth: 150, bgcolor: '#ffffff', borderRadius: '4px' }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <List>
          {filteredTasks.map((task, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: priorityColors[task.priority],
                mb: 1,
                borderRadius: 1,
                color: '#000000',
              }}
            >
              {editingIndex === index ? (
                <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                  <TextField
                    value={editingTask}
                    onChange={(e) => setEditingTask(e.target.value)}
                    fullWidth
                    sx={{ bgcolor: '#ffffff', borderRadius: '4px' }}
                  />
                  <IconButton onClick={handleSaveEdit}>
                    <Check />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <ListItemText
                    primary={task.text}
                    secondary={`Priority: ${task.priority}`}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: '#000000',
                    }}
                  />
                  <Box>
                    <IconButton onClick={() => handleToggleComplete(index)}>
                      {task.completed ? <Close /> : <Check />}
                    </IconButton>
                    <IconButton onClick={() => handleEditTask(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(index)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}
