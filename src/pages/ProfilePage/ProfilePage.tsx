import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { updateProfile } from 'src/shared/reducers/authentication';

const Profile = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.authentication.account);
  const loading = useAppSelector(state => state.authentication.loading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: account.username,
      firstName: account.firstName || '',
      lastName: account.lastName || '',
    },
  });

  const onSubmit = values => {
    dispatch(updateProfile(values));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <FontAwesomeIcon icon="address-card" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit your profile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    label="First Name"
                    autoFocus
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    autoComplete="family-name"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Email Address"
                name="email"
                placeholder={account.username}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Accept
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};
export default Profile;
