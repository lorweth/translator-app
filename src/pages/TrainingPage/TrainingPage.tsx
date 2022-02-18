import { Box, LinearProgress, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllCategories, findCategoryByName } from './category.reducer';

const Training = () => {
  const dispatch = useAppDispatch();
  const [tern, setTern] = React.useState('');
  const categoryLoading = useAppSelector(state => state.category.loading);
  const categoryError = useAppSelector(state => state.category.errorMessage);
  const categories = useAppSelector(state => state.category.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const onChangeSearchField = event => {
    const { value } = event.target;
    setTern(value);
  };

  const onClickSearchButton = e => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(tern);
    if (tern && tern.length > 0) {
      dispatch(findCategoryByName(tern));
    }
  };

  return (
    <Box sx={{ flewGrown: 1, mb: 2 }}>
      <Box component="form" onSubmit={e => onClickSearchButton(e)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={10}>
            <TextField
              margin="normal"
              fullWidth
              label="Enter keyword here"
              onChange={e => onChangeSearchField(e)}
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
      <Box>
        {categoryLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {categories && categories.length > 0 ? (
              categories.map(cate => (
                <Grid item xs={12} md={6} key={cate._id}>
                  <Paper
                    sx={{
                      textAlign: 'center',
                      color: 'black',
                      height: 60,
                      lineHeight: '60px',
                    }}
                  >
                    {cate.name}
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item key="no-result">
                <Paper
                  sx={{
                    textAlign: 'center',
                    color: 'black',
                    height: 60,
                    lineHeight: '60px',
                  }}
                >
                  No result
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
export default Training;
