import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../actions/userActions';
import { styled } from '@mui/material/styles';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const success = useSelector((state) => state.users.success);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      dispatch(signUpUser(name, email, password));
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return passwordPattern.test(password);
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
    <Container maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(validateEmail(e.target.value));
            }}
            error={!isEmailValid}
            helperText={!isEmailValid ? 'example@example.com' : ''}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(validatePassword(e.target.value));
            }}
            error={!isPasswordValid}
            helperText={!isPasswordValid ? 'The password must be between 7 to 15 characters and contain at least one digit (0-9) and one special character (!@#$%^&*).' : ''}
          />
          <div style={{ display: 'flex' }}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
            <div style={{ width: '6rem' }} /> 
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </div>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default SignUp;
