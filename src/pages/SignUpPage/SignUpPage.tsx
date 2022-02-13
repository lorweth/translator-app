import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpModal from 'src/components/SignUpModal/SignUpModal';
import { useAppDispatch, useAppSelector } from 'src/configs/store';
import { Storage } from 'src/util/storage-util';
import { handleRegistration } from './register.reducer';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [isAuthenticated] = useState(
    Storage.local.get('authToken') || Storage.session.get('authToken')
  );
  const successMessage = useAppSelector(state => state.register.successMessage);
  const errorMessage = useAppSelector(state => state.register.errorMessage);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      navigator('/');
    }
  }, [successMessage]);

  const handleSignUp = (
    username: string,
    password: string,
    firstname: string,
    lastname: string
  ) => {
    dispatch(handleRegistration({ username, password, firstname, lastname }));
  };

  const handleClose = () => {
    setShowModal(false);
    navigator(-1);
  };

  if (isAuthenticated) {
    navigator('/');
  }

  return (
    <SignUpModal
      showModal={showModal}
      handleSignUp={handleSignUp}
      handleClose={handleClose}
      errorMessage={errorMessage}
    />
  );
};
export default SignUpPage;
