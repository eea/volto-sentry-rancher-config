// Markers of frames that belong to browser extensions, WebViews or
// translation proxies, not to our bundles (EEA `sentry-triage` skill).
const NOISE_FRAME_MARKERS = [
  'chrome-extension://',
  'moz-extension://',
  'safari-extension://',
  'safari-web-extension://',
  'webkit-masked-url',
  'ext:core/',
  'iabjs://',
  '<leanwright:',
];

const NOISE_HOSTS = ['translate.goog'];

// Superagent rejects with `new Error(response.statusText)` for any non-2xx
// API response. 404 and 410 are expected answers here: the redirector returns
// 410 for retired Plone 4 URLs, and crawlers keep asking for removed pages.
const EXPECTED_API_STATUSES = [404, 410];

const getFrames = (event) =>
  (event?.exception?.values || []).flatMap(
    (value) => value?.stacktrace?.frames || [],
  );

/**
 * Drop events that come from extensions/WebViews/translation proxies.
 * @param {Object} event Sentry event.
 * @returns {boolean} True when the event should not be sent.
 */
export const isNoiseEvent = (event) => {
  const host = event?.tags?.server_name || event?.request?.url || '';
  if (NOISE_HOSTS.some((noiseHost) => host.includes(noiseHost))) {
    return true;
  }

  return getFrames(event).some((frame) => {
    const file = frame?.filename || frame?.abs_path || '';
    return NOISE_FRAME_MARKERS.some((marker) => file.includes(marker));
  });
};

/**
 * Drop expected API errors: a 404/410 answered by the API is a valid response,
 * not a bug. Only the generic `Unsuccessful HTTP response` error is dropped, so
 * real errors (even when they happen to be 4xx/5xx) keep reaching Sentry.
 * @param {Object} event Sentry event.
 * @param {Object} hint Sentry event hint, carries the original exception.
 * @returns {boolean} True when the event should not be sent.
 */
export const isExpectedApiError = (event, hint) => {
  const error = hint?.originalException;
  const message = event?.exception?.values?.[0]?.value;

  return (
    message === 'Unsuccessful HTTP response' &&
    EXPECTED_API_STATUSES.includes(error?.status)
  );
};

const applyConfig = (config) => {
  const _sentryOptions = config.settings.sentryOptions;
  let hostname = 'localhost';
  let site = 'SSR';
  // RAZZLE_PUBLIC_URL env var takes priority if set
  let envPublicURL;
  if (__CLIENT__) {
    hostname = window?.location?.hostname || hostname;
    envPublicURL = window?.env?.RAZZLE_PUBLIC_URL || window?.env?.publicURL;
    site = envPublicURL || window?.location?.host || site;
  }
  if (__SERVER__) {
    hostname = require('os').hostname() || hostname;
    envPublicURL = process?.env?.RAZZLE_PUBLIC_URL || process?.env?.publicURL;
    site = envPublicURL || site;
  }
  // If RAZZLE_PUBLIC_URL is set, it wins over per-request detectedHost overrides
  site = (
    envPublicURL ||
    config?.settings?.publicURL ||
    config?.settings?.apiPath ||
    site
  )
    .replace('/api', '')
    .replace('https://', '')
    .replace('http://', '');

  const sentryOptions = {
    environment: 'production',
    serverName: hostname,
    logger: 'volto',
    // Client-side equivalent of server-side ignoredErrors in server.jsx.
    // Superagent creates errors with `new Error(res.statusText)` for non-OK
    // responses. These are the HTTP status texts for codes we already silence
    // on the server: 401, 404, 410 (301/302 are handled as redirects, not
    // unhandled rejections, so they are excluded here).
    ignoreErrors: [
      /^Unauthorized$/,
      /^Not Found$/,
      /^Gone$/,
      // Browser noise: layout loops, cancelled requests and unhandled
      // non-Error rejections (Volto Api rejects with `{code, status, url}`).
      /ResizeObserver loop/,
      /^aborted$/,
      /Request has been terminated/,
      /Non-Error promise rejection captured/,
      // DOM nodes moved by extensions or Google Translate.
      /not a child of this node/,
    ],
    beforeSend: (event, hint) =>
      isNoiseEvent(event) || isExpectedApiError(event, hint) ? null : event,
    tags: {
      site: site,
      logger: 'volto',
      server_name: hostname,
    },
  };

  if (site.includes('localhost')) {
    sentryOptions.environment = 'development';
  }

  if (site.includes('dev')) {
    sentryOptions.environment = 'development';
  }

  if (site.includes('demo')) {
    sentryOptions.environment = 'development';
  }

  config.settings.sentryOptions = _sentryOptions
    ? (libraries) => ({
        ..._sentryOptions(libraries),
        ...sentryOptions,
      })
    : () => ({
        ...sentryOptions,
      });

  return config;
};

export default applyConfig;
