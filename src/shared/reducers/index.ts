import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import register from 'src/pages/SignUpPage/register.reducer';
import category from 'src/pages/TrainingPage/category.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  register,
  category,
};

export default rootReducer;
