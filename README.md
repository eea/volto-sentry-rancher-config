# volto-sentry-rancher-config

[![Releases](https://img.shields.io/github/v/release/eea/volto-sentry-rancher-config)](https://github.com/eea/volto-sentry-rancher-config/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-sentry-rancher-config%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-sentry-rancher-config/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-sentry-rancher-config%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-sentry-rancher-config/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config&branch=develop)

[Volto](https://github.com/plone/volto) add-on to auto-configure Sentry from Rancher metadata

## Features

1. Auto-extract [Sentry options](https://docs.voltocms.com/deploying/sentry/#configuration-options) (tags, environment, etc.) from [Rancher Metadata](https://rancher.com/docs/rancher/v1.6/en/rancher-services/metadata-service/)

## Deploying with Docker/Rancher

* See [EEA Website Frontend](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend) Rancher Catalog template for integration example:
  * [docker-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend/105/docker-compose.yml)
  * [rancher-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/eea-website-frontend/105/rancher-compose.yml)

## Getting started

### Try volto-sentry-rancher-config with Docker

      git clone https://github.com/eea/volto-sentry-rancher-config.git
      cd volto-sentry-rancher-config
      make
      make start

Go to http://localhost:3000

`make start` now defaults to Volto 18. To run the same setup against Volto 17, use:

      VOLTO_VERSION=17 make
      VOLTO_VERSION=17 make start

### Add volto-sentry-rancher-config to your Volto project

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

   For a legacy Volto 17 project, install the package with `yarn` and restart the frontend as usual.

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-sentry-rancher-config/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-sentry-rancher-config/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-sentry-rancher-config/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
