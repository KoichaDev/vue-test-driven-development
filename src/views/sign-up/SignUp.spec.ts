import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
// import axios from 'axios';

import SignUp from './SignUp.vue';

// vi.mock('axios');

const mockFetch = vi.fn();
global.fetch = mockFetch;

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

      const nodeSubmitButtonDisabled = screen.getByRole('button', { name: 'Sign up' });

      expect(nodeSubmitButtonDisabled).toBeDisabled();
    });
  });

  describe('when user sets same value for password inputs', () => {
    it('enables button', async () => {
      const user = userEvent.setup();
      render(SignUp);

      const passwordInputField = screen.getByLabelText('Password');
      const repeatedPasswordInputField = screen.getByLabelText('Password Repeat');

      await user.type(passwordInputField, 'dummy-password');
      await user.type(repeatedPasswordInputField, 'dummy-password');

      const nodeSubmitButton = screen.getByRole('button', { name: 'Sign up' });

      expect(nodeSubmitButton).toBeEnabled();
    });
  });

  describe('when user submits form', () => {
    it('sends username, email and password to the back-end', async () => {
      const user = userEvent.setup();
      render(SignUp);

      const usernameInputField = screen.getByLabelText('Username');
      const emailInputField = screen.getByLabelText('E-mail');
      const passwordInputField = screen.getByLabelText('Password');
      const repeatedPasswordInputField = screen.getByLabelText('Password Repeat');

      await user.type(usernameInputField, 'user1');
      await user.type(emailInputField, 'user1@mail.com');
      await user.type(passwordInputField, 'fake-password');
      await user.type(repeatedPasswordInputField, 'fake-password');

      const nodeSubmitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.click(nodeSubmitButton);

      expect(mockFetch).toHaveBeenCalledWith('/api/v1/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: 'user1',
          email: 'user1@mail.com',
          password: 'fake-password'
        })
      });

      // expect(axios.post).toHaveBeenCalledWith('/api/v1/users', {
      //   username: 'user1',
      //   email: 'user1@mail.com',
      //   password: 'fake-password'
      // });
    });
  });
});
