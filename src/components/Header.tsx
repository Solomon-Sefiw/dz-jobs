import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Work,
  Phone,
  PinDropRounded,
  Edit,
  Logout,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { toggleDarkMode } from '../features/themeSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const dispatch = useAppDispatch();
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Programmatically navigate
  const [isProfileOpen, setProfileOpen] = useState(false);

  // Define menu items with paths
  const menuItems = [
    { label: 'About Me', href: '/about', icon: <AccountCircle /> },
    { label: 'Skills', href: '/skills', icon: <Work /> },
    { label: 'Projects', href: '/projects', icon: <PinDropRounded /> },
    { label: 'Contact', href: '/contact', icon: <Phone /> },
  ];

  // Determine selected tab based on URL
  const currentIndex = menuItems.findIndex((item) => item.href === location.pathname);

  // Detect mobile screens
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Top App Bar */}
      <AppBar position="sticky" sx={{ background: darkMode ? '#333' : '#1976d2' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())} sx={{ mr: 2 }}>
            {darkMode ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Solomon Sefiw
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {menuItems.map((item) => (
              <Button key={item.label} color="inherit" href={item.href} sx={{ fontWeight: 'bold' }}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Profile Icon */}
          <IconButton color="inherit" onClick={() => setProfileOpen(!isProfileOpen)}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation for Mobile Only */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <BottomNavigation
          value={currentIndex} // Set the selected index based on current route
          onChange={(_, newValue) => {
            navigate(menuItems[newValue].href); // Navigate without full reload
          }}
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: darkMode ? '#333' : '#fff',
            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)',
          }}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={isMobile ? '' : item.label}
              icon={item.icon}
              sx={{
                color: darkMode ? '#fff' : '#1976d2',
                '&.Mui-selected': {
                  color: darkMode ? '#1976d2' : '#333', // Adjust selected icon color
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>

      {/* Right Sidebar for Profile */}
      <Drawer anchor="right" open={isProfileOpen} onClose={() => setProfileOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItemButton disableRipple>
            <Typography variant="h6" fontWeight="bold">
              Profile Settings
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
