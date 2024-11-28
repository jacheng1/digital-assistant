import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function SignUpPage() {
    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                            <Typography variant="h6">Zotmate - Digital Assistant for UCI</Typography>
                            <Button color="inherit" component={Link} href="/" sx={{ ml: 2 }}>
                                Home
                                <HomeIcon sx={{ ml: 0.5 }} />
                            </Button>
                            <Button color="inherit" component={Link} href="/todo-list" sx={{ ml: 2 }}>
                                To-Do List
                                <ListIcon sx={{ ml: 0.5 }} />
                            </Button>
                            <Button color="inherit" component={Link} href="/notes" sx={{ ml: 2 }}>
                                Notes
                                <EditNoteIcon sx={{ ml: 0.5 }} />
                            </Button>
                        </Box>
                        <Button color="inherit" component={Link} href="/sign-up">
                            Get Started
                        </Button>
                        <Button color="inherit" component={Link} href="/sign-in">
                            Sign In
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center"
                    justifyContent="center"
                >
                    <SignUp />
                </Box>
            </Box>
        </Box>
    );
}