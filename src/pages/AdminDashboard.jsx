import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([
    { id: 1, name: 'John Doe', category: 'Business Startup Loans', amount: 500000, status: 'Pending' },
    { id: 2, name: 'Jane Smith', category: 'Education Loans', amount: 300000, status: 'Approved' },
    { id: 3, name: 'Ali Khan', category: 'Home Construction Loans', amount: 1000000, status: 'Rejected' },
  ]);

  const [filters, setFilters] = useState({ status: '', category: '' });

  const categories = [
    'Wedding Loans',
    'Home Construction Loans',
    'Business Startup Loans',
    'Education Loans',
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredApplications = applications.filter(
    (app) =>
      (filters.status ? app.status === filters.status : true) &&
      (filters.category ? app.category === filters.category : true)
  );

  const handleAction = (id, action) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: action } : app))
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          select
          label="Filter by Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>
        <TextField
          select
          label="Filter by Category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Applications Table */}
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount (PKR)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name}</TableCell>
                <TableCell>{app.category}</TableCell>
                <TableCell>{app.amount}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {app.status === 'Pending' && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAction(app.id, 'Approved')}
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAction(app.id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
