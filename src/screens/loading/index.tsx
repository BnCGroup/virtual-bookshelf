import Axios from 'axios';
import { SecureStore } from 'expo';
import * as React from 'react';

import LoadingComponent from '../../lib/mobile/components/loading';

import NavigationService from '../../lib/mobile/services/navigation-service';

import { images } from '../../assets';
import constants from '../../constants';

export default class LoadingScreen extends React.Component {
  public readonly state = {
    loggedIn: false,
  };

  public render() {
    return (
      <LoadingComponent
        images={images}
        startAsync={this.startAsync}
        onFinish={this.onFinish}
        onError={this.onError}
      />
    );
  }

  private startAsync = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      const accessTokenSecret = await SecureStore.getItemAsync(
        'accessTokenSecret',
      );

      console.log(accessToken, accessTokenSecret);

      const results = await Axios.post(`${constants.apiUrl}/v1/goodreads/me`, {
        accessToken,
        accessTokenSecret,
      });

      if (results.data.result) {
        this.setState({ loggedIn: true });
      }
    } catch (err) {
      if (err && err.response && err.response.data) {
        console.warn(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  private onFinish = () => {
    NavigationService.navigate(this.state.loggedIn ? 'App' : 'Auth');
  };

  private onError = (message?: any, ...params: any[]) => {
    /* tslint:disable:no-console */
    console.warn(message, params);
    /* tslint:enable:no-console */
  };
}
