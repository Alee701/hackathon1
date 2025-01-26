import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  Container,
} from '@mui/material';

const loanCategories = {
  wedding: {
    title: 'Wedding Loans',
    subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
  },
  home: {
    title: 'Home Construction Loans',
    subcategories: ['Structure', 'Finishing', 'Loan'],
  },
  startup: {
    title: 'Business Startup Loans',
    subcategories: [
      'Buy Stall',
      'Advance Rent for Shop',
      'Shop Assets',
      'Shop Machinery',
    ],
  },
  education: {
    title: 'Education Loans',
    subcategories: ['University Fees', 'Child Fees Loan'],
  },
};

const LoanRequestForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert('Loan Request Submitted Successfully!');
    console.log('Form Data:', { selectedCategory, selectedSubcategory, ...formData });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}
      >
        Loan Request Form
      </Typography>
      <Grid container spacing={4}>
        {/* Loan Category Section */}
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Select Loan Category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('');
            }}
          >
            {Object.keys(loanCategories).map((key) => (
              <MenuItem key={key} value={key}>
                {loanCategories[key].title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {selectedCategory && (
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Select Subcategory"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              {loanCategories[selectedCategory].subcategories.map(
                (subcategory, index) => (
                  <MenuItem key={index} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>
        )}

        {/* Personal Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="CNIC"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={!selectedCategory || !selectedSubcategory || !formData.name}
          >
            Submit Loan Request
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoanRequestForm;
