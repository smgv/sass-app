export const isPasswordValid = (password: string) => {
  if (!password) return false;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!$@%])[0-9a-zA-Z!$@%]{6,}$/;
  return passwordRegex.test(password);
};

export const isConfirmPasswordValid = (
  confirmPassword: string,
  password: string
) => {
  if (!confirmPassword) return false;
  return confirmPassword === password;
};
