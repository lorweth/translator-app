import { toast } from 'react-toastify';

const addErrorAlert = (message, status) => {
  toast.error(message + ' ' + status);
};

export default () => next => action => {};
