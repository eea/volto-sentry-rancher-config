const applyConfig = (config) => {
  const _sentryOptions = config.settings.sentryOptions;
  let hostname = 'localhost';
  let site = 'SSR';
  if (__CLIENT__) {
    hostname = window?.location?.hostname || hostname;
    site = window?.env?.publicURL || window?.location?.host || site;
  }
  if (__SERVER__) {
    hostname = require('os').hostname() || hostname;
    site = process?.env?.publicURL || site;
  }
  site = (config?.settings?.publicURL || config?.settings?.apiPath || site)
    .replace('/api', '')
    .replace('https://', '')
    .replace('http://', '');

  const sentryOptions = {
    environment: 'production',
    serverName: hostname,
    logger: 'volto',
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
