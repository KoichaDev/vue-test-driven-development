import type { Brand } from '@/helpers/Brand';

export type ValidPassword = Brand<string, 'Password'>;

export const isNotValidPassword = (
  passwordField: ValidPassword,
  repeatedPasswordField: ValidPassword
) => {
  return !(passwordField && repeatedPasswordField && passwordField === repeatedPasswordField);
};
