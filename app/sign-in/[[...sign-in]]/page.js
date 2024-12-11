import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function SignInPage() {
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #EBEBEB",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <Box component="span" sx={{ color: "#000000" }}>
                  Zot
                </Box>
                <Box component="span" sx={{ color: "#5fc4d2" }}>
                  Mate
                </Box>
              </Typography>
              <Box sx={{ marginLeft: 15, display: "flex", gap: 3 }}>
                <Button
                  color="inherit"
                  component={Link}
                  href="/"
                  sx={{ color: "#5fc4d2", fontWeight: "bold" }}
                >
                  Home
                  <HomeIcon sx={{ ml: 0.5 }} />
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/todo-list"
                  sx={{ color: "#000000", fontWeight: "bold" }}
                >
                  To-Do List
                  <ListIcon sx={{ ml: 0.5 }} />
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  href="/notes"
                  sx={{ color: "#000000", fontWeight: "bold" }}
                >
                  Notes
                  <EditNoteIcon sx={{ ml: 0.5 }} />
                </Button>
              </Box>
            </Box>
            <Button
              variant="outlined"
              component={Link}
              href="/sign-up"
              sx={{
                color: "#5fc4d2",
                ml: 2,
                borderRadius: "8px",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 3,
                paddingRight: 3,
                borderColor: "#5fc4d2",
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "#5fc4d2",
                },
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/sign-in"
              sx={{
                color: "#FFFFFF",
                backgroundColor: "#5fc4d2",
                ml: 2,
                borderRadius: "8px",
                paddingTop: 1.5,
                paddingBottom: 1.5,
                paddingLeft: 3,
                paddingRight: 3,
                "&:hover": {
                  backgroundColor: "#bbf4fe",
                },
              }}
            >
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
          <SignIn />
        </Box>
      </Box>
    </Box>
  );
}
