import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Divider, Grid, LinearProgress, Paper, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import MutPaper from 'src/shared/components/MutPaper';
import { getAllVocabulariesOfTheCategory } from './vocabulary.reducer';

const VocabularyPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { categoryId } = params;

  const vocabularyLoading = useAppSelector(state => state.vocabulary.loading);
  const vocabularies = useAppSelector(state => state.vocabulary.vocabularies);
  const vocabularyError = useAppSelector(state => state.vocabulary.errorMessage);

  const onClickBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getAllVocabulariesOfTheCategory(categoryId));
  }, []);

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
                  <MutPaper
                    sx={{
                      textAlign: 'center',
                      color: 'black',
                      height: 60,
                      lineHeight: '60px',
                    }}
                    vocabulary={vocabulary}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} md={12}>
                <Button variant="contained" color="warning" fullWidth size="large">
                  No vocabulary found
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
export default VocabularyPage;
