import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { styled } from '@mui/material/styles';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { LockOutlined, EmailOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { warning } from '../utils/shared.service';

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
  const success = useSelector((state) => state.users.success);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    warning("loged succesful","success")
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
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailOutlined fontSize="small" />,
            }}
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
            InputProps={{
              startAdornment: <LockOutlined fontSize="small" />,
            }}
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
