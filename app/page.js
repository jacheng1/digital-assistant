'use client'

import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import bot_icon from './assets/bot.png';

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ color: "#2196f3" }}>Zotmate - Digital Assistant for UCI</Typography>
              <Button color="inherit" component={Link} href="/" sx={{ color: "#2196f3", ml: 3 }}>
                Home
                <HomeIcon sx={{ ml: 0.5 }} />
              </Button>
              <Button color="inherit" component={Link} href="/todo-list" sx={{ color: "#2196f3", ml: 3 }}>
                To-Do List
                <ListIcon sx={{ ml: 0.5 }} />
              </Button>
              <Button color="inherit" component={Link} href="/notes" sx={{ color: "#2196f3", ml: 3 }}>
                Notes
                <EditNoteIcon sx={{ ml: 0.5 }} />
              </Button>
            </Box>
            <SignedOut>
              <Button 
                color="inherit" 
                component={Link} 
                href="/sign-up" 
                sx={{ 
                  color: "#FFFFFF", 
                  backgroundColor: "#2196f3", 
                  ml: 2,
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#68B5F0"
                  }
                }}
              >
                Get Started
              </Button>
              <Button 
                color="inherit"
                component={Link} 
                href="/sign-in" 
                sx={{ 
                  color: "#FFFFFF", 
                  backgroundColor: "#2196f3", 
                  ml: 2,
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#68B5F0"
                  }
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
      <Container maxWidth="lg">
        <Box
          sx={{
            padding: 3,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" sx={{ color: "#2196f3", marginRight: 2 }}>Hello, Guest!</Typography>
          <Image src={bot_icon} alt="Bot Icon" />
        </Box>
      </Container>
    </Box>
  );
}
