import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAllVocabulariesOfTheCategory } from './vocabulary.reducer';
import { updateFavoriteWord } from 'src/shared/reducers/favorite.reducer';
import { toast } from 'react-toastify';
import { grey } from '@mui/material/colors';

const VocabularyPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId } = params;

  const vocabularyLoading = useAppSelector(state => state.vocabulary.loading);
  const vocabularies = useAppSelector(state => state.vocabulary.vocabularies);
  const vocabularyError = useAppSelector(state => state.vocabulary.errorMessage);

  const favoriteUpdateSuccess = useAppSelector(state => state.favorite.updateSuccess);

  const onClickBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAllVocabulariesOfTheCategory(categoryId));
  }, []);

  // Toast when Add Favorite Success
  useEffect(() => {
    if (favoriteUpdateSuccess) {
      toast.success('Add to favorite list successfully!!!');
    }
  }, [favoriteUpdateSuccess]);

  const addToFavorite = (vocabularyId: string) => {
    dispatch(updateFavoriteWord(vocabularyId));
    // window.alert(`Add ${vocabularyId} to favorite`);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <Button variant="contained" color="info" onClick={() => onClickBack()}>
        <FontAwesomeIcon icon="arrow-left" />
      </Button>
      <Divider sx={{ mt: 3, mb: 3 }}>THIS IS SOME VOCABULARIES OF THE CATEGORY</Divider>
      <Box>
        {vocabularyLoading ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={60} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={60} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {vocabularies && vocabularies.length > 0 ? (
              vocabularies.map(vocabulary => (
                <Grid item xs={12} md={6} key={vocabulary._id}>
                  {/* <MutPaper
                    sx={{
                      textAlign: 'center',
                      color: 'black',
                      height: 60,
                      lineHeight: '60px',
                    }}
                    vocabulary={vocabulary}
                  /> */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {vocabulary.word}
                      </Typography>
                      <Divider />
                      <Typography sx={{ mt: 1.5 }} color="text.secondary">
                        <FontAwesomeIcon icon="arrow-right-long" />
                        &nbsp;{vocabulary.meaning}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => addToFavorite(vocabulary._id)}>
                        <FontAwesomeIcon icon="star" />
                        &nbsp;Add to favorite
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={12}>
                <Typography
                  variant="body1"
                  sx={{ padding: 1, backgroundColor: 'white', color: grey[700] }}
                >
                  No vocabulary found
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
export default VocabularyPage;
