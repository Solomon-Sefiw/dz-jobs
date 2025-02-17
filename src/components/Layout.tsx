import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useAppSelector } from '../features/hooks';
import { customTheme } from '../styles/theme';

const Layout: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <CssBaseline />
      <Header />
      <main style={{ minHeight: 'calc(100vh - 200px)', padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
