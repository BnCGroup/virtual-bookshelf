import Axios from 'axios';
import { Linking, SecureStore, WebBrowser } from 'expo';
import * as React from 'react';
import { Alert, Button, ImageBackground, StyleSheet, View } from 'react-native';

import NavigationService from '../../lib/mobile/services/navigation-service';

import { images } from '../../assets';
import constants from '../../constants';

const styles = StyleSheet.create({
  backgound: {
    alignItems: 'center',
    flex: 4,
    height: '100%',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    height: 40,
    justifyContent: 'flex-start',
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#000',
    flex: 4,
  },
});

export default class AuthScreen extends React.Component {
  public readonly state = {
    attemptedLogin: false,
    oauthToken: null,
    oauthTokenSecret: null,
    result: null,
  };

  public componentDidMount() {
    Linking.addEventListener('url', this.handleGoodreadsRedirect);
    this.login();
  }

  public render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.homeBackground}
          style={styles.backgound}
          resizeMode="cover"
        >
          <View
            style={{
              flexGrow: 2,
            }}
          />
          {this.loginButton()}
          <View
            style={{
              flexGrow: 1,
            }}
          />
        </ImageBackground>
      </View>
    );
  }

  private loginButton = () => {
    if (this.state.attemptedLogin) {
      return (
        <View style={styles.button}>
          <Button title="Login" onPress={this.login} color="#000" />
        </View>
      );
    } else {
      return null;
    }
  };

  private handleGoodreadsRedirect = async (event: { url: string }) => {
    if (event.url.indexOf('oauth-redirect') === -1) {
      return;
    }

    WebBrowser.dismissBrowser();

    const { queryParams } = Linking.parse(event.url);

    if (queryParams.authorize !== '1') {
      return Alert.alert(
        'Authorization Required',
        'Authorization to your Goodreads account enable to use this app.',
      );
    }

    if (queryParams.oauth_token !== this.state.oauthToken) {
      return Alert.alert('Error 201', 'Something went wrong while logging in');
    }

    let results;

    try {
      results = await Axios.post(
        `${constants.apiUrl}/v1/goodreads/access-token`,
        {
          authorized: queryParams.authorize,
          oauthToken: this.state.oauthToken,
          oauthTokenSecret: this.state.oauthTokenSecret,
        },
      );
    } catch (err) {
      if (err && err.response && err.response.data) {
        console.warn(err.response.data);
      } else {
        console.warn(err);
      }
      return Alert.alert('Error 202', 'Something went wrong while logging in');
    }

    if (!results.data.result || !results.data.result.success) {
      console.warn(results.data);
      return Alert.alert('Error 203', 'Something went wrong while logging in');
    }

    try {
      await SecureStore.setItemAsync(
        'accessToken',
        results.data.result.accessToken,
      );
      await SecureStore.setItemAsync(
        'accessTokenSecret',
        results.data.result.accessTokenSecret,
      );
    } catch (err) {
      console.warn(err);
      return Alert.alert('Error 204', 'Something went wrong while logging in');
    }

    console.log(results.data.result);

    NavigationService.navigate('App');
  };

  private login = async () => {
    const results = await Axios.post(
      `${constants.apiUrl}/v1/goodreads/request-token`,
      {},
      {
        params: {
          redirect: Linking.makeUrl('oauth-redirect'), // AuthSession.getRedirectUrl(), //
        },
      },
    );

    if (!results.data.result) {
      console.warn(results.data);
      return Alert.alert('Error 101', 'Something went wrong while logging in');
    }

    this.setState({
      oauthToken: results.data.result.oauthToken,
      oauthTokenSecret: results.data.result.oauthTokenSecret,
    });

    setTimeout(() => {
      this.setState({
        attemptedLogin: true,
      });
    }, 250);

    WebBrowser.openBrowserAsync(results.data.result.authorizeUrl + '&mobile=1');
  };
}
