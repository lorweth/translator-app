import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount, logout } from 'src/reducers/authentication';
import { Storage } from 'src/util/storage-util';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, firstName, lastName } = useAppSelector(state => state.authentication.account);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Storage.local.get('authToken') || Storage.session.get('authToken')
  );
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
          <p>If you not have a account</p>
          <Button onClick={() => navigate('/signup')}>Please Signup!</Button>
        </div>
      )}
    </div>
  );
};
export default Welcome;
