import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import Siderbar, { SidebarItem } from './components/Sidebar/Sidebar';
import { Outlet as RouterOutlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const App = (props: AppProps) => {
  const { window } = props;
  const [isOpenSidebar, setIsOpenSiderbar] = useState(false);
  const sidebarWidth = 240;

  const container = window !== undefined ? () => window().document.body : undefined;

  const listSidebarItems: SidebarItem[] = [
    { text: 'welcome', icon: 'house' },
    { text: 'translate', icon: 'language' },
    { text: 'training', icon: 'graduation-cap' },
    { text: 'video', icon: 'clapperboard' },
    { text: 'favorites', icon: 'heart' },
    { text: 'profile', icon: 'user' },
  ];

  const handleToggleSidebar = () => {
    setIsOpenSiderbar(!isOpenSidebar);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleSidebar}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            {isOpenSidebar ? <FontAwesomeIcon icon="x" /> : <FontAwesomeIcon icon="bars" />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Translator
          </Typography>
        </Toolbar>
      </AppBar>
      <Siderbar
        container={container}
        isOpen={isOpenSidebar}
        onClose={handleToggleSidebar}
        sidebarWidth={sidebarWidth}
        items={listSidebarItems}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${sidebarWidth}px)` } }}
      >
        <Toolbar />
        {/* Router Outlet here */}
        <RouterOutlet />
      </Box>
    </Box>
  );
};
export default App;
