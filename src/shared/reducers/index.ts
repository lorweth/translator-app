import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import register from 'src/pages/SignUpPage/register.reducer';
const rootReducer = {
  loadingBar,
  authentication,
  register,
};

export default rootReducer;
