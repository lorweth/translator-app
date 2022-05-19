import { Button, Link, Paper, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount, logout } from 'src/shared/reducers/authentication';
import { StorageAPI } from 'src/shared/util/storage-util';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, firstName, lastName } = useAppSelector(state => state.authentication.account);
  const isLoggedIn = !!(StorageAPI.local.get('authToken') || StorageAPI.session.get('authToken'));
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAccount());
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 3,
        padding: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flexGrow: 3,
      }}
    >
      <Box display="flex" padding={3} flexDirection="column" alignItems="center">
        <img
          src="/greeting.jpg"
          alt="greeting"
          loading="lazy"
          style={{ width: 400, height: 'auto' }}
        />
      </Box>
      <Box display="flex" padding={3} flexDirection="column" justifyContent="center">
        <Typography variant="h3" fontWeight={777} color={orange[700]} gutterBottom>
          Welcome to the Translator
        </Typography>
        {isAuthenticated ? (
          <Box component="div">
            <p>Hello {firstName && lastName ? `${firstName} ${lastName}` : username}</p>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/update-password')}
            >
              Update Password
            </Button>
            &nbsp;
            <Button variant="outlined" color="error" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </Box>
        ) : (
          <div>
            <Button variant="outlined" onClick={() => navigate('/login')}>
              Please Signin!
            </Button>
            <p>
              If you do not already have an account{' '}
              <Link href="/signup" variant="body1">
                Signup!
              </Link>
            </p>
          </div>
        )}
      </Box>
    </Paper>
  );
};
export default Welcome;
