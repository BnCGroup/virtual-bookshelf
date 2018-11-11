import * as React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { images } from '../../assets';

const styles = StyleSheet.create({
  backgound: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default class AppScreen extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.homeBackground}
          style={styles.backgound}
          resizeMode="cover"
        >
          <Text>
            Open up src/screens/app/index.tsx to start working on your app!
          </Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </ImageBackground>
      </View>
    );
  }
}
