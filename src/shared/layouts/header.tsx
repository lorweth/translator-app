import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, IconButton, SxProps, Theme, Toolbar, Typography } from '@mui/material';
import React from 'react';

type PropsType = {
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  sx?: SxProps<Theme>;
  handleClickButton: () => void;
  isActived: boolean;
};

const Header = (props: PropsType) => {
  const { position, sx, handleClickButton, isActived } = props;
  return (
    <AppBar position={position} sx={sx}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleClickButton}
          edge="start"
          sx={{
            marginRight: '36px',
          }}
        >
          {isActived ? <FontAwesomeIcon icon="x" /> : <FontAwesomeIcon icon="bars" />}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Translator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
