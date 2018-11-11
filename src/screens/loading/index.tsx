import * as React from 'react';
import LoadingComponent from '../../lib/mobile/components/loading';

import NavigationService from '../../lib/mobile/services/navigation-service';

import { images } from '../../assets';

export default class LoadingScreen extends React.Component {
  public render() {
    return (
      <LoadingComponent
        images={images}
        onFinish={this.onFinish}
        onError={this.onError}
      />
    );
  }

  private onFinish = () => {
    NavigationService.navigate('App');
  };

  private onError = (message?: any, ...params: any[]) => {
    /* tslint:disable:no-console */
    console.warn(message, params);
    /* tslint:enable:no-console */
  };
}
