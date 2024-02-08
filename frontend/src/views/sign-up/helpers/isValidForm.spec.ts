import { describe, expect, it } from 'vitest';
import { isNotValidPassword } from './isValidForm';

describe('isValidPassword()', () => {
  it('should return true if password fields are empty', () => {
    expect(isNotValidPassword('', '')).toBe(true);
  });

  it('should return true if only one password field is empty', () => {
    expect(isNotValidPassword('password', '')).toBe(true);
    expect(isNotValidPassword('', 'password')).toBe(true);
  });

  it('should return false if passwords match', () => {
    expect(isNotValidPassword('password', 'password')).toBe(false);
  });

  it('should return true if passwords do not match', () => {
    expect(isNotValidPassword('password', 'differentpassword')).toBe(true);
  });
});
