import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllCategories, findCategoryByName } from 'src/shared/reducers/category.reducer';

const VideoCategory = () => {
  const [tern, setTern] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categoryLoading = useAppSelector(state => state.category.loading);
  const categories = useAppSelector(state => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const onChangeSearchField = event => {
    const { value } = event.target;
    setTern(value);
  };

  // Submit search
  const onSubmit = e => {
    e.preventDefault();
    dispatch(findCategoryByName(tern));
  };

  return (
    <Box sx={{ flexGrown: 1, mb: 2 }}>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={10}>
            <TextField
              margin="normal"
              fullWidth
              label="Enter keyword here"
              onChange={onChangeSearchField}
              autoFocus
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, pt: 2, pb: 2 }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ mt: 3, mb: 3 }}>PLEASE CHOOSE A CATEGORY</Divider>
      <Box>
        {categoryLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {categories && categories.length > 0 ? (
              categories.map(c => (
                <Grid item xs={12} md={6} lg={3} key={c._id}>
                  <Paper
                    sx={{
                      textAlign: 'center',
                      color: 'black',
                      height: 60,
                      lineHeight: '60px',
                    }}
                    onClick={() => navigate('/video/' + c._id)}
                  >
                    {c.name}
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={12} key={'no-category'}>
                <Typography
                  variant="body1"
                  sx={{ padding: 1, backgroundColor: 'white', color: grey[700] }}
                >
                  No video here
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
export default VideoCategory;
