import React, { Suspense, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet as RouterOutlet } from 'react-router-dom';
import Siderbar, { SidebarItem } from '../components/Sidebar/Sidebar';
import Footer from './footer';
import Header from './header';
import { toast, ToastContainer } from 'react-toastify';
import { LinearProgress } from '@mui/material';

const sidebarWidth = 240;

const sidebarItemList: SidebarItem[] = [
  { text: 'welcome', icon: 'house' },
  { text: 'translate', icon: 'language' },
  { text: 'training', icon: 'graduation-cap' },
  { text: 'video', icon: 'clapperboard' },
  { text: 'favorites', icon: 'heart' },
  { text: 'profile', icon: 'user' },
];

interface AppProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

const lightTheme = createTheme();

const MainLayout = (props: AppProps) => {
  const { window } = props;
  const [isOpenSidebar, setOpenSidebar] = useState(true);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleToggleSidebar = () => {
    setOpenSidebar(!isOpenSidebar);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${sidebarWidth}px)` },
            ml: { sm: `${sidebarWidth}px` },
          }}
          handleClickButton={handleToggleSidebar}
          isActived={isOpenSidebar}
        />
        <Siderbar
          container={container}
          isOpen={isOpenSidebar}
          onClose={handleToggleSidebar}
          sidebarWidth={sidebarWidth}
          items={sidebarItemList}
        />
        {/* Main content */}
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${sidebarWidth}px)` },
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Suspense fallback={<LinearProgress color="secondary" />}>{props.children}</Suspense>
          </Container>
        </Box>
      </Box>
      {/* Footer content */}
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4 }}>
        <Footer title="Translator Application" description="Ứng dụng học tiếng Anh thú vị" />
      </Box>
    </ThemeProvider>
  );
};
export default MainLayout;
