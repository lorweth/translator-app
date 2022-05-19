import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

export interface ISignInModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const SignInModal = (props: ISignInModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const { showModal, loginError, handleLogin, handleClose } = props;

  const onSubmit = values => handleLogin(values.username, values.password, values.remember);

  // const onSubmit = values => alert(JSON.stringify(values, null, 2));

  return (
    <Modal open={showModal} onClose={handleClose}>
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
          Sign in
        </Typography>
        {loginError && (
          <Alert color="error">
            <AlertTitle>Error</AlertTitle>
            <p>Invalid username or password</p>
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Controller
            control={control}
            name="username"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoComplete="username"
                error={!!errors.username}
                helperText={errors.username && 'Please enter a username'}
                autoFocus
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                margin="normal"
                type="password"
                required
                fullWidth
                label="Password"
                error={!!errors.password}
                helperText={errors.password && 'Please enter a password'}
                autoComplete="current-password"
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="remember"
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                control={<Checkbox checked={value} onChange={onChange} />}
                label="Remember Me"
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
export default SignInModal;
// https://dev.to/elyngved/turn-anything-into-a-form-field-with-react-hook-form-controller-42c
