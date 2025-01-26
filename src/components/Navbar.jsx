import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
          }}
        >
          Saylani Microfinance
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/calculator">
          Calculator
        </Button>
        <Button
          color="inherit"
          onClick={handleMenuOpen}
        >
          Loans
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation('/loans/education')}>
            Education Loans
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/loans/startup')}>
            Business Startup Loans
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/loans/wedding')}>
            Wedding Loans
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/loans/home')}>
            Home Construction Loans
          </MenuItem>
        </Menu>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
        <Button color="inherit" onClick={() => alert('Logged Out!')}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
