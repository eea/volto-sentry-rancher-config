import os from 'os';

const applyConfig = (config) => {
  const sentryOptions = {
    environment: 'production',
    serverName: os.hostname(),
    logger: 'volto',
    tags: {
      site: 'localhost',
      logger: 'volto',
      server_name: os.hostname(),
    },
  };

  if (config?.settings?.apiPath) {
    sentryOptions.tags.site = config.settings.apiPath
      .replace('/api', '')
      .replace('https://', '')
      .replace('http://', '');
  }

  if (sentryOptions.tags.site.includes('localhost')) {
    sentryOptions.environment = 'development';
  }

  if (sentryOptions.tags.site.includes('dev')) {
    sentryOptions.environment = 'development';
  }

  config.settings.sentryOptions = {
    ...config.settings.sentryOptions,
    ...sentryOptions,
  };

  return config;
};

export default applyConfig;
