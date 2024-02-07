import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import SignUp from './SignUp.vue';

describe('sign up', () => {
  it('has sign up header', () => {
    render(SignUp);

    const header = screen.getByRole('heading', { name: 'Sign Up' });

    expect(header).toBeInTheDocument();
  });

  it('has username input', () => {
    render(SignUp);

    const NodeUsernameLabel = screen.getByLabelText('Username');

    expect(NodeUsernameLabel).toBeInTheDocument();
  });

  it('has email input', () => {
    render(SignUp);

    const nodeEmailLabel = screen.getByLabelText('E-mail');

    expect(nodeEmailLabel).toBeInTheDocument();
  });

  describe('password fields', () => {
    it('has password input', () => {
      render(SignUp);

      const nodePasswordLabel = screen.getByLabelText('Password');

      expect(nodePasswordLabel).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(SignUp);

      const nodePasswordInputType = screen.getByLabelText('Password');

      expect(nodePasswordInputType).toHaveAttribute('type', 'password');
    });

    it('has password repeated input', () => {
      render(SignUp);

      const nodePasswordLabel = screen.getByLabelText('Password Repeat');

      expect(nodePasswordLabel).toBeInTheDocument();
    });

    it('has password type for password repeat input', () => {
      render(SignUp);

      const nodePasswordInputType = screen.getByLabelText('Password Repeat');

      expect(nodePasswordInputType).toHaveAttribute('type', 'password');
    });
  });

  describe('button', () => {
    it('has sign up button', () => {
      render(SignUp);

      const nodeButton = screen.getByRole('button', { name: 'Sign up' });

      expect(nodeButton).toBeInTheDocument();
    });

    it('disables the button initially', () => {
      render(SignUp);

      const nodeButtonDisabled = screen.getByRole('button', { name: 'Sign up' });

      expect(nodeButtonDisabled).toBeDisabled();
    });
  });
});
