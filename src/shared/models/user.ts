export default interface User {
  username?: string;
  firstName?: string;
  lastName?: string;
}

export const defaultValue: User = {
  username: '',
  firstName: '',
  lastName: '',
};
