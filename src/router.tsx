import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { createSwitchNavigator, NavigationComponent } from 'react-navigation';

import NavigationService from './lib/mobile/services/navigation-service';

import AppScreen from './screens/app';
import LoadingScreen from './screens/loading';

const AppNavigator = createSwitchNavigator(
  {
    App: AppScreen,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default class App extends React.Component {
  public render() {
    return (
      <AppNavigator
        ref={(navigatorRef: NavigationComponent) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
