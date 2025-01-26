import React from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';

const GuarantorDetails = ({ guarantor, index, onChange }) => {
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Guarantor {index} Details
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        value={guarantor.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="CNIC"
        value={guarantor.cnic}
        onChange={(e) => onChange(index, 'cnic', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Address"
        value={guarantor.address}
        onChange={(e) => onChange(index, 'address', e.target.value)}
        sx={{ mb: 2 }}
      />
    </Paper>
  );
};

export default GuarantorDetails;
