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
    ignoreErrors: [/^Unauthorized$/, /^Not Found$/, /^Gone$/],
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
