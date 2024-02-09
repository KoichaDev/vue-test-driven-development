import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import SignUp from './SignUp.vue';

import axios from 'axios';

vi.mock('axios');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('when user sets same value for password inputs', () => {
  describe('when user submits form', () => {
    it('sends username, email and password to the back-end', async () => {
      axios.post.mockResolvedValue({ data: {} });
      const user = userEvent.setup();
      render(SignUp);

      const usernameInputField = screen.getByLabelText('Username');
      const emailInputField = screen.getByLabelText('E-mail');
      const passwordInputField = screen.getByLabelText('Password');
      const repeatedPasswordInputField = screen.getByLabelText('Password Repeat');

      await user.type(usernameInputField, 'user1');
      await user.type(emailInputField, 'user1@mail.com');
      await user.type(passwordInputField, 'P4ssword');
      await user.type(repeatedPasswordInputField, 'P4ssword');

      const nodeSubmitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.click(nodeSubmitButton);

      const mockPayload = {
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword'
      };

      expect(axios.post).toHaveBeenCalledWith('/api/v1/users', mockPayload);
    });

    describe('when there is an ongoing API call', () => {
      it('does not allow clicking the button', async () => {
        axios.post.mockResolvedValue({ data: {} });

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
        await user.click(nodeSubmitButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
      });
    });
  });
});
