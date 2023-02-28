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

type PageViewMetada = {
  canonicalUrl?: string;
  publicationDate?: string;
  title?: string;
  authors?: Array<string>;
  imageUrl?: string;
  section?: string;
  tags?: Array<string>;
};

/**
 * Track a pageview event
 *
 * @export
 * @param {string} url - The URL of the article being tracked
 * @param {string} [urlRef] - The url of the page that linked to the viewed page. Analogous to HTTP referer
 * @param {PageViewMetada} [metadata] - Metadata for the viewed page
 * @param {Record<string, unknown>} [extraData] - A dictionary of additional information to send with the generated pageview event
 * @param {string} [siteId] - The Parsely site ID for which the pageview event should be counted
 * @return {*}  {void}
 */
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

/**
 * Recommended implementation: Call startEngagement when a post is navigated to, and to call stopEngagement when it’s navigated away from.

  Start engaged time tracking for the given URL. Once called, heartbeat events will automatically be sent periodically to capture engaged time for this url until engaged time tracking is stopped.

  This call also automatically stops tracking engaged time for any urls that are not the current url.
 *
 * @export
 * @param {string} url - The URL of the article being tracked
 * @param {string} [urlRef] - The url of the page that linked to the viewed page. Analogous to HTTP referer
 * @param {Record<string, unknown>} [extraData] - iOS ONLY. A dictionary of additional information to send with generated heartbeat events
 * @param {string} [siteId] - The Parsely site ID for which the heartbeat events should be counted
 * @return {*}  {void}
 */
export function startEngagement(
  url: string,
  urlRef?: string,
  extraData?: Record<string, unknown>,
  siteId?: string
): void {
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
