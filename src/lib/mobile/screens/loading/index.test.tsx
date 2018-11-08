import * as React from 'react';
import Screen from './';

import * as renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Screen />).toJSON();
  expect(rendered).toBeTruthy();
});
