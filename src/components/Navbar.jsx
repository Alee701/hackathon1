import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ role, userName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Simulate login state check
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  }, [location]);

  const toggleMobileMenu = (open) => {
    setMobileMenuOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsLoggedIn(false);
    navigate('/auth');
  };

  const userLinks = [
    { label: 'Home', path: '/' },
    { label: 'Loan Request', path: '/loan-request' },
    { label: 'Loan Slips', path: '/loan-slips' },
    { label: 'Profile', path: '/profile' },
  ];

  const adminLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Appointments', path: '/admin/appointments' },
    { label: 'Profile', path: '/admin/profile' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        backgroundColor: '#1976d2',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Brand Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Saylani Microfinance
        </Typography>

        {/* Desktop Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {links.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  color: isActive(link.path) ? '#ffffff' : '#f0f0f0',
                  fontWeight: isActive(link.path) ? 'bold' : 'normal',
                  backgroundColor: isActive(link.path)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'transparent',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: 'capitalize' }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Avatar
                  alt={userName || 'User'}
                  sx={{
                    backgroundColor: 'secondary.main',
                    cursor: 'pointer',
                    ml: 2,
                  }}
                  onClick={() => navigate('/profile')}
                >
                  {userName?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/auth')}
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleMobileMenu(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => toggleMobileMenu(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            width: '70%',
          },
        }}
      >
        <Box sx={{ width: '100%', p: 2 }}>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}
          >
            Navigation
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          <List>
            {links.map((link) => (
              <ListItem
                button
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => toggleMobileMenu(false)}
                sx={{
                  color: isActive(link.path) ? 'secondary.main' : '#ffffff',
                  backgroundColor: isActive(link.path)
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          {isLoggedIn ? (
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/auth')}
              sx={{ mt: 2, borderColor: '#ffffff', color: '#ffffff' }}
            >
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
