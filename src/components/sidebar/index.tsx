import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import React from 'react';

export type SidebarItem = {
  text: string;
  icon: IconProp;
};

const Siderbar = ({ container, isOpen, onClose, listSidebarItems, sidebarWidth }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
      aria-label="sidebar items"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {listSidebarItems.map((data, index) => (
            <ListItem button key={data.text}>
              <ListItemIcon>
                <FontAwesomeIcon icon={data.icon} />
              </ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sidebarWidth },
        }}
        open
      >
        <Toolbar />
        <Divider />
        <List>
          {listSidebarItems.map((data, index) => (
            <ListItem button key={data.text}>
              <ListItemIcon>
                <FontAwesomeIcon icon={data.icon} />
              </ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default Siderbar;
