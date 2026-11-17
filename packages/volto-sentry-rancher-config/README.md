# @eeacms/volto-sentry-rancher-config

[![Releases](https://img.shields.io/github/v/release/eea/volto-sentry-rancher-config)](https://github.com/eea/volto-sentry-rancher-config/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-sentry-rancher-config%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-sentry-rancher-config/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config)

[Volto](https://github.com/plone/volto) add-on to auto-configure Sentry from Rancher metadata

## Features

1. Auto-extract [Sentry options](https://docs.voltocms.com/deploying/sentry/#configuration-options) (tags, environment, etc.) from [Rancher Metadata](https://rancher.com/docs/rancher/v1.6/en/rancher-services/metadata-service/)

## Deploying with Docker/Rancher

* See [EEA Website Frontend](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend) Rancher Catalog template for integration example:
  * [docker-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend/105/docker-compose.yml)
  * [rancher-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend/105/rancher-compose.yml)

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-sentry-rancher-config": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-sentry-rancher-config'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
