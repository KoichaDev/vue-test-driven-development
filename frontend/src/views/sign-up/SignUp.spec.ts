import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http, type DefaultBodyType } from 'msw';
import { setupServer } from 'msw/node';

import SignUp from './SignUp.vue';

let counter = 0;

let requestBody: DefaultBodyType = {};
const server = setupServer(
  http.post('api/v1/users', async ({ request }) => {
    requestBody = await request.json();
    counter += 1;
    return HttpResponse.json({});
  })
);

// ! Counter is increasing, because we are using same server above with other tests
// ! Solution is just reset the value to 0 each time the server is doing multiple requests being handled.
beforeEach(() => {
  counter = 0;
});

beforeAll(() => server.listen());

afterAll(() => server.listen());

server.listen();

async function mockSignUpFormSetup() {
  const user = userEvent.setup();
  const renderResult = render(SignUp);

  const usernameInputField = screen.getByLabelText('Username');
  const emailInputField = screen.getByLabelText('E-mail');
  const passwordInputField = screen.getByLabelText('Password');
  const repeatedPasswordInputField = screen.getByLabelText('Password Repeat');

  await user.type(usernameInputField, 'user1');
  await user.type(emailInputField, 'user1@mail.com');
  await user.type(passwordInputField, 'fake-password');
  await user.type(repeatedPasswordInputField, 'fake-password');

  const button = screen.getByRole('button', { name: 'Sign up' });

  return {
    ...renderResult,
    user,
    element: {
      button
    }
  };
}

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
      const {
        user,
        element: { button }
      } = await mockSignUpFormSetup();

      const passwordInputField = screen.getByLabelText('Password');
      const repeatedPasswordInputField = screen.getByLabelText('Password Repeat');

      await user.type(passwordInputField, 'dummy-password');
      await user.type(repeatedPasswordInputField, 'dummy-password');

      expect(button).toBeEnabled();
    });
  });

  describe('when user submits form', () => {
    it('sends username, email and password to the back-end', async () => {
      const {
        user,
        element: { button }
      } = await mockSignUpFormSetup();

      await user.click(button);
      await waitFor(() => {
        expect(requestBody).toEqual({
          username: 'user1',
          email: 'user1@mail.com',
          password: 'fake-password'
        });
      });
    });

    describe('when there is an ongoing API call', () => {
      it('does not allow clicking the button', async () => {
        const {
          user,
          element: { button }
        } = await mockSignUpFormSetup();

        await user.click(button);
        await user.click(button);

        await waitFor(() => {
          expect(counter).toBe(1);
        });
      });

      it('display spinner icon', async () => {
        const {
          user,
          element: { button }
        } = await mockSignUpFormSetup();

        await user.click(button);

        const loadingSpinner = screen.getByRole('status');
        expect(loadingSpinner).toBeInTheDocument();
      });

      it('does not display spinner icon', async () => {
        render(SignUp);

        // returning null when there is no element, an not throwing exception
        const loadingSpinner = screen.queryByRole('status');

        expect(loadingSpinner).not.toBeInTheDocument();
      });
    });
  });
});
