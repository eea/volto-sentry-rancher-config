import fetch from 'node-fetch';
import os from 'os';

const RANCHER_METADATA =
  'http://rancher-metadata/latest/self/stack/environment_name';

const update_sentry_config = (env, config) => {
  fetch(RANCHER_METADATA)
    .then((res) => res.text())
    .then(
      (result) => {
        config.environment = result;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.log(
          "Couldn't auto-configure SENTRY environment from rancher-metadata",
          error.message,
        );
      },
    );

  if (env.API_PATH) {
    config.tags.site = env.API_PATH.replace('/api', '')
      .replace('https://', '')
      .replace('http://', '');
  }
};

let env_obj = {};
if (typeof window === 'undefined') {
  if (process.env) {
    if (!process.env.RAZZLE_SENTRY_BACKEND_CONFIG) {
      const sentry_config = {
        extras: {
          logger: 'volto',
        },
        logger: 'volto',
        environment: 'devel',
        serverName: os.hostname(),
        tags: {
          site: 'localhost',
        },
      };

      try {
        update_sentry_config(process.env, sentry_config);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Couldn't auto-configure SENTRY", error.message);
      }

      process.env.RAZZLE_SENTRY_BACKEND_CONFIG = JSON.stringify(sentry_config);
    }

    const envs = Object.keys(process.env);
    const filtered = envs.filter((env) => env.startsWith('RAZZLE_'));
    env_obj = filtered.reduce(
      (o, key) => Object.assign(o, { [key]: process.env[key] }),
      {},
    );
  }
} else {
  if (window.env) {
    if (
      !window.env.RAZZLE_SENTRY_FRONTEND_CONFIG &&
      window.env.RAZZLE_SENTRY_BACKEND_CONFIG
    ) {
      window.env.RAZZLE_SENTRY_FRONTEND_CONFIG =
        window.env.RAZZLE_SENTRY_BACKEND_CONFIG;
    }

    const envs = Object.keys(window.env);
    env_obj = envs.reduce(
      (o, key) => Object.assign(o, { [key]: window.env[key] }),
      {},
    );
  }
}
export const runtimeConfig = env_obj;
