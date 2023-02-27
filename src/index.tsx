import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'parsely-react-native-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ParselyReactNativeSdk = NativeModules.ParselyReactNativeSdk
  ? NativeModules.ParselyReactNativeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function configure(siteId: string): void {
  return ParselyReactNativeSdk.configure(siteId);
}

type PageViewMetada = {
  canonicalUrl?: string;
  publicationDate?: string;
  title?: string;
  authors?: Array<string>;
  imageUrl?: string;
  section?: string;
  tags?: Array<string>;
};

export function trackPageView(
  url: string,
  urlRef?: string,
  metadata?: PageViewMetada,
  extraData?: Record<string, unknown>,
  siteId?: string
): void {
  const {
    canonicalUrl,
    publicationDate,
    title,
    authors,
    imageUrl,
    section,
    tags,
  } = metadata || {};
  return ParselyReactNativeSdk.trackPageView(
    url,
    urlRef,
    extraData,
    siteId,
    canonicalUrl,
    publicationDate,
    title,
    authors,
    imageUrl,
    section,
    tags
  );
}

export function startEngagement(
  url: string,
  urlRef?: string,
  extraData?: Record<string, unknown>,
  siteId?: string
): void {
  return ParselyReactNativeSdk.startEngagement(url, urlRef, extraData, siteId);
}

export function stopEngagement(): void {
  return ParselyReactNativeSdk.stopEngagement();
}
