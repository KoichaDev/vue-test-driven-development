import { render } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import FormInput from './FormInput.vue';

describe('FormInput.vue', () => {
  describe('when error message is set', () => {
    it('has is-invalid class for input', () => {
      const { container } = render(FormInput, {
        props: {
          errorMessage: 'Error message'
        }
      });

      const input = container.querySelector('input');

      expect(input).toHaveClass('is-invalid');
    });

    it('has invalid-feedback class for paragraph element', () => {
      const { container } = render(FormInput, {
        props: {
          errorMessage: 'Error message'
        }
      });

      const paragraphNode = container.querySelector('p');

      expect(paragraphNode).toHaveClass('invalid-feedback');
    });
  });

  describe('when error message is not set', () => {
    it('does not have is-invalid class for input', () => {
      const { container } = render(FormInput);

      const input = container.querySelector('input');

      expect(input).not.toHaveClass('is-invalid');
    });
  });
});
