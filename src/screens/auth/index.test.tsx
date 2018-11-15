import * as React from 'react';
import AuthScreen from '.';

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<AuthScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
