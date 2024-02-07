import { describe, expect, it } from 'vitest';
import HelloWorld from '../HelloWorld.vue';

import { render, screen } from '@testing-library/vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    render(HelloWorld, { props: { msg: 'Hello Vitest' } });

    const helloWorldElement = screen.getByText('Hello Vitest');

    expect(helloWorldElement).toBeInTheDocument();

    // const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    // expect(wrapper.text()).toContain('Hello Vitest')
  });
});
