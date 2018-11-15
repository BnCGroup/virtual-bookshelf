import * as React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationComponent,
} from 'react-navigation';

import NavigationService from './lib/mobile/services/navigation-service';

import AuthScreen from './screens/auth';
import HomeScreen from './screens/home';
import LoadingScreen from './screens/loading';

const HomeStack = createStackNavigator(
  {
    Primary: HomeScreen,
  },
  {
    initialRouteName: 'Primary',
  },
);

const AppStack = createBottomTabNavigator(
  {
    Owned: {
      screen: HomeStack,
      title: 'Owned',
    },
    Scan: {
      screen: HomeStack,
      title: 'Scan',
    },
    Wanted: {
      screen: HomeStack,
      title: 'Wanted',
    },
  },
  {
    initialRouteName: 'Scan',
    lazy: false,
    order: ['Wanted', 'Scan', 'Owned'],
    removeClippedSubviews: false,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthScreen,
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
