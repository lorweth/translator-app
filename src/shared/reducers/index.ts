import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import authentication from './authentication';
import register from 'src/pages/SignUpPage/register.reducer';
import category from 'src/pages/TrainingPage/category.reducer';
import vocabulary from 'src/pages/TrainingPage/vocabulary.reducer';
import favorite from './favorite.reducer';
import translate from 'src/pages/TranslatePage/translate.reducer';

const rootReducer = {
  loadingBar,
  authentication,
  register,
  category,
  vocabulary,
  favorite,
  translate,
};

export default rootReducer;
