import * as React from 'react';
import AppScreen from '.';

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<AppScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
