import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { updateProfile } from 'src/shared/reducers/authentication';
import { useNavigate } from 'react-router-dom';

type TFormDefaultValue = {
  currentPassword: string;
  retypePassword: string;
  newPassword: string;
};

const UpdatePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.authentication.loading);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormDefaultValue>();

  const onSubmit = values => {
    let error = false;
    if (values.currentPassword !== values.retypePassword) {
      toast.error('current password is incorrect!');
      error = true;
    }
    if (values.currentPassword === values.newPassword) {
      toast.error('password not changed!');
      error = true;
    }

    if (!error) {
      dispatch(updateProfile({ password: values.newPassword }))
        .then(() => {
          toast.success('Password update successfully');
          navigate('/');
        })
        .catch(() => toast.error('Password update failed'));
    }
  };

  return (
    <Box
      sx={{
        top: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <FontAwesomeIcon icon="user-shield" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Change password
      </Typography>
      {/* {loginError && ( */}
      {/*     <Alert color="error"> */}
      {/*       <AlertTitle>Error</AlertTitle> */}
      {/*       <p>Invalid username or password</p> */}
      {/*     </Alert> */}
      {/* )} */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
          control={control}
          name="currentPassword"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              margin="normal"
              type="password"
              fullWidth
              label="Enter current password"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword && 'Please enter current password'}
              autoFocus
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="retypePassword"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              margin="normal"
              type="password"
              fullWidth
              label="Retype current password"
              error={!!errors.retypePassword}
              helperText={errors.retypePassword && 'Please retype current password'}
              autoComplete="current-password"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              margin="normal"
              type="password"
              fullWidth
              label="Enter new password"
              error={!!errors.newPassword}
              helperText={errors.newPassword && 'Please type new password'}
              autoComplete="current-password"
              {...field}
            />
          )}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default UpdatePassword;
