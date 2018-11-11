import {
  NavigationActions,
  NavigationComponent,
  NavigationNavigateAction,
  NavigationParams,
} from 'react-navigation';

let navigator: NavigationComponent;

function setTopLevelNavigator(navigatorRef: NavigationComponent) {
  navigator = navigatorRef;
}

function navigate(
  routeName: string,
  params?: NavigationParams,
  action?: NavigationNavigateAction,
  key?: string,
) {
  navigator.dispatch(
    NavigationActions.navigate({
      action,
      key,
      params,
      routeName,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
