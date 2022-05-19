import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, AlertTitle, Checkbox, FormControlLabel, Modal } from '@mui/material';
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';

export interface ISignUpModalProps {
  showModal: boolean;
  errorMessage: string;
  handleSignUp: (username: string, password: string, firstname: string, lastname: string) => void;
  handleClose: () => void;
}

const SignUpModal = (props: ISignUpModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      retypePassword: '',
      firstname: '',
      lastname: '',
    },
  });

  const { showModal, errorMessage, handleSignUp, handleClose } = props;

  // const onSubmit = values => alert(JSON.stringify(values, null, 2));

  const onSubmit = values => {
    const { username, password, retypePassword, firstname, lastname } = values;
    if (password !== retypePassword) {
      toast.error('Passwords do not match');
    } else {
      handleSignUp(username, password, firstname, lastname);
    }
  };

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
          Sign up
        </Typography>
        {errorMessage && (
          <Alert color="error">
            <AlertTitle>Error</AlertTitle>
            <p>{errorMessage}</p>
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="firstname"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    autoComplete="given-name"
                    label="First Name"
                    autoFocus
                    error={!!errors.firstname}
                    helperText={errors.firstname && 'Please enter your first name'}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="lastname"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Last Name"
                    autoComplete="family-name"
                    error={!!errors.lastname}
                    helperText={errors.lastname && 'Please enter your last name'}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="username"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username && 'Please enter a username'}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password && 'Please enter a password'}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="retypePassword"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    type="password"
                    fullWidth
                    label="Retype Password"
                    error={!!errors.retypePassword}
                    helperText={errors.retypePassword && 'Please enter a current password'}
                    {...field}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Controller
                control={control}
                name="allowExtraEmails"
                render={({ field: { value, onChange } }) => (
                  <FormControlLabel
                    control={<Checkbox checked={value} onChange={onChange} />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                )}
              />
            </Grid> */}
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};
export default SignUpModal;
