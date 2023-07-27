import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import "../css/dashboardStyles.css"; 

export const Dashboard = () => {
  const musicQuotes = [
    "Music is the divine way to tell beautiful, poetic things to the heart.",
    "Music gives a soul to the universe, wings to the mind, flight to the imagination, and life to everything.",
    "Without music, life would be a mistake.",
  ];
  const randomQuote = musicQuotes[Math.floor(Math.random() * musicQuotes.length)];

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" gutterBottom>
        Welcome to the Music Application
      </Typography>

      <Box className="quoteBox">
        <Typography variant="body1" fontStyle="italic" color="text.secondary">
          {randomQuote}
        </Typography>
      </Box>

      <Box className="buttonsContainer">
        <Button variant="contained" color="primary" size="large" sx={{ marginRight: "1rem" }}>
          <Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>
            Signup
          </Link>
        </Button>
        <Button variant="outlined" color="primary" size="large" sx={{ marginRight: "1rem" }}>
          <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
            Login
          </Link>
        </Button>
        <Button variant="outlined" color="secondary" size="large">
          <Link to="/songs" style={{ textDecoration: "none", color: "inherit" }}>
            Listen to Music
          </Link>
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
