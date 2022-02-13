import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { getAccount, logout } from 'src/reducers/authentication';

const Welcome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { username, firstName, lastName } = useAppSelector(state => state.authentication.account);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  useEffect(() => {
    dispatch(getAccount());
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
          <Button variant="outlined" color="secondary" onClick={() => navigate('/signup')}>
            Please Signup!
          </Button>
        </div>
      )}
    </div>
  );
};
export default Welcome;
