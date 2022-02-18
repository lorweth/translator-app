import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import register from 'src/pages/SignUpPage/register.reducer';
import category from 'src/pages/TrainingPage/category.reducer';
import vocabulary from 'src/pages/TrainingPage/vocabulary.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  register,
  category,
  vocabulary,
};

export default rootReducer;
