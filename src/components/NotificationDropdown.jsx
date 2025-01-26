import React, { useEffect, useState, useContext } from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications } from '../services/api';
import AppContext from '../context/AppContext';

const NotificationDropdown = () => {
  const { state } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(state.user.id);
        setNotifications(response.data.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, [state.user.id]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((notification, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {notification.message}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationDropdown;
