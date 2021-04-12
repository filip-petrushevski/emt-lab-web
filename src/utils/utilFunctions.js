export const initialUppercaseFollowedByLowercase = (s) => {
  return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
};
