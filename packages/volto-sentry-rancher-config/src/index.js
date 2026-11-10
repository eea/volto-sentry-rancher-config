// Markers of frames that belong to browser extensions, WebViews or
// translation proxies, not to our bundles (see docs/2026-11-02-sentry-triage).
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
    beforeSend: (event) => (isNoiseEvent(event) ? null : event),
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
