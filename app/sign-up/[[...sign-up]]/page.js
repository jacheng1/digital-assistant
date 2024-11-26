import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function SignUpPage() {
    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>Zotmate - Digital Assistant for UCI</Typography>
                        <Button color="inherit" component={Link} href="/sign-in">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} href="/sign-up">
                            Sign Up
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