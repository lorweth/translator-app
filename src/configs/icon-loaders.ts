import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faMinus,
  faPlay,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faTasks,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const loadIcon = () => {
  library.add(
    faArrowLeft,
    faSignInAlt,
    faSignOutAlt,
    faPlus,
    faMinus,
    faTasks,
    faTrash,
    faUser,
    faPlay,
    faSpinner
    // Add more icons here
  );
};
