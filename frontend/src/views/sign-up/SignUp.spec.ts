import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http, type DefaultBodyType } from 'msw';
import { setupServer } from 'msw/node';

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
      let requestBody: DefaultBodyType = {};
      const server = setupServer(
        http.post('api/v1/users', async ({ request }) => {
          requestBody = await request.json();

          return HttpResponse.json({});
        })
      );

      server.listen();

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
      await waitFor(() => {
        expect(requestBody).toEqual({
          username: 'user1',
          email: 'user1@mail.com',
          password: 'fake-password'
        });
      });

      server.close();
    });

    describe('when there is an ongoing API call', () => {
      it('does not allow clicking the button', async () => {
        let counter = 0;

        const server = setupServer(
          http.post('api/v1/users', () => {
            counter += 1;
            return HttpResponse.json({});
          })
        );

        server.listen();

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

        await waitFor(() => {
          expect(counter).toBe(1);
        });

        server.close();
      });
    });
  });
});
