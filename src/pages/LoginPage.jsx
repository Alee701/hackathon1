import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { loginUser, registerUser } from '../services/api'; // Backend API calls
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Register
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '', // Only used for registration
  });
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFormData({ email: '', password: '', name: '' }); // Reset form data
    setError(null); // Reset error
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleAuth = () => {
    alert('Google Authentication Coming Soon!');
    // Implement Google Authentication using OAuth
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 0) {
        // Login
        const response = await loginUser({ email: formData.email, password: formData.password });
        dispatch({ type: 'SET_USER', payload: response.data.user });
        navigate('/dashboard');
      } else {
        // Register
        const response = await registerUser(formData);
        dispatch({ type: 'SET_USER', payload: response.data.user });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          {activeTab === 0 ? 'Login' : 'Register'}
        </Typography>

        {/* Tabs for Login and Register */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Login/Register Form */}
        <form onSubmit={handleSubmit}>
          {activeTab === 1 && (
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required={activeTab === 1}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {activeTab === 0 ? 'Login' : 'Register'}
          </Button>
        </form>

        {/* Google Authentication Button */}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleGoogleAuth}
        >
          Continue with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthPage;
