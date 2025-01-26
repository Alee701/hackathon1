import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { getUserDetails, updateUserDetails } from '../services/api';
import AppContext from '../context/AppContext';

const ProfilePage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserDetails(state.user.id);
        setFormData(response.data);
      } catch (err) {
        setErrorMessage('Error fetching profile details.');
      }
    };
    fetchProfile();
  }, [state.user.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserDetails(state.user.id, formData);
      setSuccessMessage('Profile updated successfully.');
      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (err) {
      setErrorMessage('Error updating profile.');
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
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            label="Phone"
            name="phone"
            margin="normal"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="CNIC"
            name="cnic"
            margin="normal"
            variant="outlined"
            value={formData.cnic}
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
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
