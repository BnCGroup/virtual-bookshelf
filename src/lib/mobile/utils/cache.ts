import { Asset, Font } from 'expo';
import { Image } from 'react-native';

export interface IImageSet {
  [key: string]: string | number;
}

export function cacheImages(images: IImageSet) {
  return Object.entries<string | number>(images).map(([key, image]) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export interface IFontSet {
  [key: string]: Font.FontMap;
}

export function cacheFonts(fonts: IFontSet) {
  return Object.entries<Font.FontMap>(fonts).map(([key, font]) =>
    Font.loadAsync(font),
  );
}
