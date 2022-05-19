import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { deleteFavoriteWord, getAllFavorites } from 'src/shared/reducers/favorite.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { grey } from '@mui/material/colors';

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorite.favoriteList);
  const loading = useAppSelector(state => state.favorite.loading);
  const updateSuccess = useAppSelector(state => state.favorite.updateSuccess);

  useEffect(() => {
    dispatch(getAllFavorites());
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      // toast message when remove a favorite word
      toast.success('Removing favorite word successfully');
      dispatch(getAllFavorites());
    }
  }, [updateSuccess]);

  const removeFavoriteWord = (vocabularyId: string) => {
    dispatch(deleteFavoriteWord(vocabularyId));
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <Box>
        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {favorites && favorites.length > 0 ? (
              favorites.map(favor => (
                <Grid item xs={12} md={6} lg={3} key={favor._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {favor.word}
                      </Typography>
                      <Divider />
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        <FontAwesomeIcon icon="arrow-right-long" />
                        &nbsp;{favor.meaning}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => removeFavoriteWord(favor._id)}
                      >
                        <FontAwesomeIcon icon="trash" />
                        &nbsp;remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{ padding: 1, backgroundColor: 'white', color: grey[700] }}
                >
                  No favorite here
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
