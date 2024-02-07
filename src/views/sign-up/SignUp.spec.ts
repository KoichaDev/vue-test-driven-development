import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/vue';

import SignUp from './SignUp.vue';

describe('sign up', () => {
  it('has sign up header', () => {
    render(SignUp);

    const header = screen.getByRole('heading', { name: 'Sign Up' });

    expect(header).toBeInTheDocument();
  });
});
