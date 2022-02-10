import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Siderbar, { SidebarItem } from './components/sidebar';

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
        listSidebarItems={listSidebarItems}
      />
    </Box>
  );
};
export default App;
