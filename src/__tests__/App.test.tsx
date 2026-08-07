import { render } from '@testing-library/react';

import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

// fails , will look
test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
