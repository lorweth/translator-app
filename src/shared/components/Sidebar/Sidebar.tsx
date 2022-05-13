import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';
import React from 'react';
import { Link, LinkProps, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export type SidebarItem = {
  text: string;
  icon: IconProp;
};

type DisplaySidebarProps = {
  items: SidebarItem[];
};

const CustomNavLink = ({ title, to, icon }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <ListItemButton
      component={NavLink}
      to={to}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        m: 1,
        borderRadius: 2,
      }}
      style={
        match
          ? {
              backgroundColor: lightBlue[400],
              color: 'white',
            }
          : {
              color: grey[700],
            }
      }
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 2 : 'auto',
          justifyContent: 'center',
          color: 'inherit',
        }}
      >
        <FontAwesomeIcon icon={icon} color="inherit" />
      </ListItemIcon>
      <ListItemText primary={to} sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  );
};

const DisplaySidebarItems = ({ items }: DisplaySidebarProps) => (
  <List>
    {items.map((data, index) => (
      <CustomNavLink key={index} title="title" to={data.text} icon={data.icon} />
    ))}
  </List>
);

type SidebarProps = {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: any;
  container: any;
  sidebarWidth: number;
};

const Siderbar = (props: SidebarProps) => {
  const { container, isOpen, onClose, items, sidebarWidth } = props;
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
        <DisplaySidebarItems items={items} />
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
        <DisplaySidebarItems items={items} />
      </Drawer>
    </Box>
  );
};
export default Siderbar;
