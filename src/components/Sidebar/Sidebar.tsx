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
import ListItemLink from '../ListItemLink/ListItemLink';

export type SidebarItem = {
  text: string;
  icon: IconProp;
};

type DisplaySidebarProps = {
  items: SidebarItem[];
};

const DisplaySidebarItems = ({ items }: DisplaySidebarProps) => (
  <List>
    {items.map((data, index) => (
      <ListItemLink
        key={index}
        icon={<FontAwesomeIcon icon={data.icon} />}
        primary={data.text}
        to={data.text}
      />
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
