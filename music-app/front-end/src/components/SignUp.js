import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../actions/userActions';
import { styled } from '@mui/material/styles';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../css/signUpStyles.css';
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
});

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToSongs, setRedirectToSongs] = useState(false);
  const success = useSelector((state) => state.users.success);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(name, email, password));
  };

  useEffect(() => {
    if (success) {
      setRedirectToSongs(true);
    }
  }, [success]);

  if (redirectToSongs) {
    window.location.href = '/songs';
  }

  return (
    <Container maxWidth="xs" className="container">
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <div className="formContainer">
          <StyledForm className="form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: 'flex' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="submitButton"
              >
                Sign Up
              </Button>
              <div style={{ width: '6rem' }} />
              <Link to="/login">
                <Button variant="contained" color="primary" className="linkButton">
                  Login
                </Button>
              </Link>
            </div>
          </StyledForm>
        </div>
      </StyledPaper>
    </Container>
  );
};

export default SignUp;
