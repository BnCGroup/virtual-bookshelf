import * as React from 'react';
import LoadingScreen from '.';

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<LoadingScreen />).toJSON();
  expect(rendered).toBeTruthy();
});
