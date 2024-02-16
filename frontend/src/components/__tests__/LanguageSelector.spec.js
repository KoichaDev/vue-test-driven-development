import { render, screen } from '@/test/custom-testing-library';
import userEvent from '@testing-library/user-event';

import LanguageSelector from '../LanguageSelector.vue';

import { i18n } from '@/i18n';

describe('Language Selector', () => {
  describe.each([
    { language: 'en', text: 'EN' },
    { language: 'no', text: 'NO' }
  ])('when user select $language', ({ language, text }) => {
    it('displays expected text', async () => {
      const user = userEvent.setup();

      render(LanguageSelector);

      await user.click(screen.getByTestId(`language-${language}-selector`));
      // expect(i18n.global.locale.value).toBe('no');
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
