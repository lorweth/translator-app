import { Button, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    <div>
      <h1>Welcome</h1>
      {isAuthenticated ? (
        <div>
          <p>Hello {firstName && lastName ? `${firstName} ${lastName}` : username}</p>
          <Button variant="outlined" color="error" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </div>
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
    </div>
  );
};
export default Welcome;
