import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
  ListSubheader,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getVideoByCategory } from './video.reducer';
import { searchVideoByName, getThumbNailUrl } from './helper';
import VideoModal from './VideoModal';

const VideoList = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId } = params;

  const loading = useAppSelector(state => state.video.loading);
  const videoList = useAppSelector(state => state.video.videoList);

  const [tern, setTern] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const onChange = e => {
    const { value } = e.target;
    setTern(value);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  // store video in local state
  const [listVideoDisplayed, setListVideoDisplayed] = useState(videoList);

  useEffect(() => {
    // dispatch action to get all videos
    dispatch(getVideoByCategory(categoryId));
  }, []);

  useEffect(() => {
    setListVideoDisplayed(videoList);
  }, [videoList]);

  const onSelectVideo = video => {
    setIsOpen(true);
    setVideoId(video.youtubeId);
  };

  // handle submit search form
  const onSubmit = e => {
    e.preventDefault();
    if (tern !== '') {
      const result = searchVideoByName(videoList, tern);
      setListVideoDisplayed(result ? [result] : []);
    } else {
      setListVideoDisplayed(videoList);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={10}>
            <TextField margin="normal" fullWidth label="Enter Video Id" onChange={onChange} />
          </Grid>
          <Grid item xs={4} md={2}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, pt: 2, pb: 2 }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }}>PLEASE CHOOSE A VIDEO</Divider>
      {loading ? (
        <LinearProgress />
      ) : (
        <ImageList>
          {listVideoDisplayed && listVideoDisplayed.length > 0 ? (
            listVideoDisplayed.map((v, i) => (
              <ImageListItem key={i}>
                <img src={getThumbNailUrl(v.youtubeId)} alt={v.youtubeId} loading="lazy" />
                <ImageListItemBar
                  title="English video"
                  subtitle={'Youtube Id :' + v.youtubeId}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      onClick={() => onSelectVideo(v)}
                    >
                      <FontAwesomeIcon icon="play" />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))
          ) : (
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">There are no videos here</ListSubheader>
            </ImageListItem>
          )}
        </ImageList>
      )}
      <VideoModal isOpen={isOpen} onClose={onClose} videoId={videoId} />
    </Box>
  );
};
export default VideoList;
