import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { styled } from '@mui/material/styles';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { LockOutlined, EmailOutlined } from '@mui/icons-material';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const success = useSelector((state) => state.users.success);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      dispatch(loginUser(email, password));
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
      window.location.href = '/songs';
    }
  }, [success]);

  return (
    <Container maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
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
            InputProps={{
              startAdornment: <EmailOutlined fontSize="small" />,
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
            InputProps={{
              startAdornment: <LockOutlined fontSize="small" />,
            }}
            error={!isPasswordValid}
            helperText={!isPasswordValid ? 'The password must be between 7 to 15 characters and contain at least one digit (0-9) and one special character (!@#$%^&*).' : ''}
          />
          <div style={{ display: 'flex' }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <div style={{ width: '6rem' }} />
            <Link to="/signup">
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>
          </div>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default Login;
