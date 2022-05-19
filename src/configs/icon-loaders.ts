import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressCard,
  faArrowLeft,
  faArrowRight,
  faArrowRightArrowLeft,
  faArrowRightLong,
  faBars,
  faBell,
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
  faStar,
  faTasks,
  faTrash,
  faUser,
  faUserShield,
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
    faClapperboard,
    faUserShield,
    faAddressCard,
    faBell,
    faArrowRightLong,
    faArrowRightArrowLeft
    // Add more icons here
  );
};
