"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import EditNoteIcon from "@mui/icons-material/EditNote";
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
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete, Edit, Check, Close } from "@mui/icons-material";

export default function TodoList() {
  const [tasks, setTasks] = useState([]); // Stores the list of tasks
  const [newTask, setNewTask] = useState(""); // Input for a new task
  const [priority, setPriority] = useState("medium"); // Priority level for a new task
  const [editingIndex, setEditingIndex] = useState(null); // Tracks the index of the task being edited
  const [editingTask, setEditingTask] = useState(""); // Stores the updated task during editing
  const [filter, setFilter] = useState("all"); // Filter option for displaying tasks
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controls Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for the Snackbar

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the list
  const handleAddTask = () => {
    if (newTask.trim() === "") {
      return alert("Task cannot be empty!");
    }

    setTasks([...tasks, { text: newTask, completed: false, priority }]); // Add new task
    setNewTask(""); // Reset the task input
    setPriority("medium"); // Reset the priority to default

    // Show the Snackbar notification
    setSnackbarMessage("Task added successfully!");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Delete a task from the list
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Filter out the deleted task

    setTasks(updatedTasks);
  };

  // Toggle the completion status of a task
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);
  };

  // Start editing a task
  const handleEditTask = (index) => {
    setEditingIndex(index); // Track the index of the task being edited

    setEditingTask(tasks[index].text); // Populate the editing input with the current task text
  };

  // Save the updated task after editing
  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task, i) =>
      i === editingIndex ? { ...task, text: editingTask } : task,
    );

    setTasks(updatedTasks); // Update the task list
    setEditingIndex(null); // Reset editing state
    setEditingTask(""); // Clear the editing input
  };

  // Apply the selected filter to the task list
  const filteredTasks = tasks.filter((task) => {
    // Show all tasks
    if (filter === "all") {
      return true;
    }

    // Show only completed tasks
    if (filter === "completed") {
      return task.completed;
    }

    // Show only incomplete tasks
    if (filter === "incomplete") {
      return !task.completed;
    }

    return false;
  });

  // Define colors for task priority levels
  const priorityColors = {
    high: "#ff6347",
    medium: "#ffcc00",
    low: "#90ee90",
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", pb: 4 }}>
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
      <Container sx={{ pt: 4, maxWidth: "800px", mx: "auto" }}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#000000" }}>
            To-Do List
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              label="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              fullWidth
              sx={{ bgcolor: "#ffffff", borderRadius: "4px" }}
            />
            <FormControl
              sx={{ minWidth: 120, bgcolor: "#ffffff", borderRadius: "4px" }}
            >
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
              variant="outlined"
              onClick={handleAddTask}
              sx={{
                color: "#5fc4d2",
                borderColor: "#5fc4d2",
                borderRadius: "8px",
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#5fc4d2",
                },
              }}
            >
              Add
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl
              sx={{ minWidth: 150, bgcolor: "#ffffff", borderRadius: "4px" }}
            >
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
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: priorityColors[task.priority],
                  mb: 1,
                  borderRadius: 1,
                  color: "#000000",
                }}
              >
                {editingIndex === index ? (
                  <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
                    <TextField
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      fullWidth
                      sx={{ bgcolor: "#ffffff", borderRadius: "4px" }}
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
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        color: "#000000",
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
        </Box>
      </Container>
    </Box>
  );
}
