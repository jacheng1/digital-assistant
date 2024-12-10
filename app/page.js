"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import bot from "./assets/bot.png";
import weather_background from "./assets/weather_background.png";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temp: null,
    icon: null,
    description: null,
    location: "Irvine, CA",
  });

  const allIcons = {
    "clear sky": WbSunnyIcon,
    "few clouds": WbCloudyIcon,
    "scattered clouds": WbCloudyIcon,
    "broken clouds": WbCloudyIcon,
    "shower rain": WaterDropIcon,
    rain: WaterDropIcon,
    thunderstorm: ThunderstormIcon,
    snow: AcUnitIcon,
  };

  // Update time each second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Irvine&units=metric&appid=e5c2dc988602e61cb6990f904e66f52a`,
        );
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);

          return;
        }

        const icon = allIcons[data.weather[0].description] || WbSunnyIcon;

        setWeather({
          temp: Math.floor(data.main.temp),
          icon: icon,
          description: data.weather[0].description,
          location: `${data.name}, ${data.sys.country}`,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
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
            <SignedOut>
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
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ marginTop: "-130px" }}>
            <Typography
              variant="h1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              <Box component="span" sx={{ color: "#000000" }}>
                Welcome to Zot
              </Box>
              <Box component="span" sx={{ color: "#5fc4d2" }}>
                Mate
              </Box>
              <Box component="span" sx={{ color: "#000000" }}>
                !
              </Box>
            </Typography>
            <Typography variant="h6" sx={{ color: "#000000" }}>
              Your personal digital assistant for a seamless experience at the
              University of California, Irvine!
            </Typography>
            <Box sx={{ marginTop: "30px" }}>
              <Button
                component={Link}
                href="/todo-list"
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#5fc4d2",
                  ml: 2,
                  borderRadius: "8px",
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 4.5,
                  paddingRight: 4.5,
                  "&:hover": {
                    backgroundColor: "#bbf4fe",
                  },
                }}
              >
                To-Do List
              </Button>
              <Button
                component={Link}
                href="/notes"
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "#5fc4d2",
                  ml: 2,
                  borderRadius: "8px",
                  marginLeft: "30px",
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 4.5,
                  paddingRight: 4.5,
                  "&:hover": {
                    backgroundColor: "#bbf4fe",
                  },
                }}
              >
                Notes
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              zIndex: 1,
            }}
          >
            <Image src={bot} alt="Bot" />
          </Box>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            backgroundImage: `url(${weather_background.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
            boxShadow: 2,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "200px",
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              textAlign: "left",
              bottom: 0,
              left: 0,
              padding: 2,
            }}
          >
            {weather.icon && (
              <weather.icon sx={{ fontSize: 30, color: "white" }} />
            )}
            <Typography variant="h3" sx={{ color: "#FFFFFF" }}>
              {weather.temp ? `${weather.temp}°C` : "Loading..."}
            </Typography>
            <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
              {weather.location}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 2,
              textAlign: "right",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#FFFFFF", fontWeight: "bold" }}
            >
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
              {currentTime.toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
