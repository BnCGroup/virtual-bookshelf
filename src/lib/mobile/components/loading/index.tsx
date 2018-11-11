import { AppLoading } from 'expo';
import * as React from 'react';

import {
  cacheFonts,
  cacheImages,
  IFontSet,
  IImageSet,
} from '../../utils/cache';

interface ILoadingScreenProps {
  images?: IImageSet;
  fonts?: IFontSet;
  startAsync?: () => Promise<void>;
  onFinish?: () => void;
  onError?: (message?: any, ...params: any[]) => void;
}

export default class LoadingScreen extends React.Component<
  ILoadingScreenProps
> {
  public render() {
    return (
      <AppLoading
        startAsync={this.startAsync}
        onFinish={this.onFinish}
        onError={this.onError}
      />
    );
  }

  private startAsync = async () => {
    const promises: Array<Promise<any>> = [];

    if (this.props.images) {
      const imageAssets = cacheImages(this.props.images);

      promises.push(Promise.all([...imageAssets]));
    }

    if (this.props.fonts) {
      const fontAssets = cacheFonts(this.props.fonts);

      promises.push(Promise.all([...fontAssets]));
    }

    if (this.props.startAsync) {
      promises.push(this.props.startAsync());
    }

    await Promise.all(promises);
  };

  private onFinish = () => {
    if (this.props.onFinish) {
      this.props.onFinish();
    }
  };

  private onError = (message?: any, ...params: any[]) => {
    if (this.props.onError) {
      this.props.onError(message, params);
    }
  };
}
