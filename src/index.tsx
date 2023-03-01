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

/**
 * Configure the Parsely tracking SDK for this particular run of the application. Should be called once per application load, before other Parsely SDK functions are called.
 *
 * @export
 * @param {string} siteId - The Parsely site ID for which the pageview event should be counted. Can be overridden on individual tracking method calls.
 * @return {*}  {void}
 */
export function configure(siteId: string): void {
  return ParselyReactNativeSdk.configure(siteId);
}

export type PageViewAdditionalData = EngagementAdditionalData & {
  metadata?: PageViewMetada;
};

export type PageViewMetada = {
  canonicalUrl?: string;
  publicationDate?: string;
  title?: string;
  authors?: Array<string>;
  imageUrl?: string;
  section?: string;
  tags?: Array<string>;
};

export type EngagementAdditionalData = {
  urlRef?: string;
  extraData?: Record<string, unknown>;
  siteId?: string;
};
/**
 * Track a pageview event
 *
 * @export
 * @param {string} url - The URL of the article being tracked
 * @param {PageViewAdditionalData} [additionalData] - additional tracking information
 * @return {*}  {void}
 */
export function trackPageView(
  url: string,
  additionalData?: PageViewAdditionalData
): void {
  const { urlRef, metadata, extraData, siteId } = additionalData || {};
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

/**
 * Recommended implementation: Call startEngagement when a post is navigated to, and to call stopEngagement when it’s navigated away from.

  Start engaged time tracking for the given URL. Once called, heartbeat events will automatically be sent periodically to capture engaged time for this url until engaged time tracking is stopped.

  This call also automatically stops tracking engaged time for any urls that are not the current url.
 *
 * @export
 * @param {string} url - The URL of the article being tracked
 * @param {PageViewAdditionalData} [additionalData] - additional tracking information
 * @return {*}  {void}
 */
export function startEngagement(
  url: string,
  additionalData?: EngagementAdditionalData
): void {
  const { urlRef, extraData, siteId } = additionalData || {};
  return ParselyReactNativeSdk.startEngagement(url, urlRef, extraData, siteId);
}

/**
 * Stop tracking engaged time for the currently engaged url. This method should be called when a user navigates away from a specific page or piece of content.
 *
 * @export
 * @return {*}  {void}
 */
export function stopEngagement(): void {
  return ParselyReactNativeSdk.stopEngagement();
}
