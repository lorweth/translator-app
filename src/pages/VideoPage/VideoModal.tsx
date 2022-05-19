import { Modal, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

const VideoModal = ({ videoId, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
      </Box>
    </Modal>
  );
};
export default VideoModal;
