import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faBook,
  faClapperboard,
  faGraduationCap,
  faHeart,
  faHouse,
  faLanguage,
  faMinus,
  faPlay,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faStairs,
  faStar,
  faTasks,
  faTrash,
  faUser,
  faX,
} from '@fortawesome/free-solid-svg-icons';

export const loadIcon = () => {
  library.add(
    faArrowLeft,
    faArrowRight,
    faSignInAlt,
    faSignOutAlt,
    faPlus,
    faMinus,
    faTasks,
    faTrash,
    faUser,
    faPlay,
    faSpinner,
    faBars,
    faX,
    faHouse,
    faLanguage,
    faBook,
    faGraduationCap,
    faHeart,
    faStar,
    faClapperboard
    // Add more icons here
  );
};
