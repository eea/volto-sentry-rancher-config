# volto-sentry-rancher-config

[![Releases](https://img.shields.io/github/v/release/eea/volto-sentry-rancher-config)](https://github.com/eea/volto-sentry-rancher-config/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-sentry-rancher-config%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-sentry-rancher-config/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-sentry-rancher-config%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-sentry-rancher-config/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-sentry-rancher-config-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-sentry-rancher-config-develop)

[Volto](https://github.com/plone/volto) add-on to auto-configure Sentry from Rancher metadata

## Features

1. Auto-extract [Sentry options](https://docs.voltocms.com/deploying/sentry/#configuration-options) (tags, environment, etc.) from [Rancher Metadata](https://rancher.com/docs/rancher/v1.6/en/rancher-services/metadata-service/)

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-sentry-rancher-config

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-sentry-rancher-config
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-sentry-rancher-config"
   ],

   "dependencies": {
       "@eeacms/volto-sentry-rancher-config": "^2.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-addon-template/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-sentry-rancher-config/blob/master/DEVELOP.md2).

## Deploying with Docker/Rancher

- See [Volto IMS](https://github.com/eea/eea.rancher.catalog/blob/master/templates/volto-ims) Rancher Catalog template for integration example:
  - [docker-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/volto-ims/39/docker-compose.yml#L14-L20)
  - [rancher-compose.yml](https://github.com/eea/eea.rancher.catalog/blob/master/templates/volto-ims/39/rancher-compose.yml#L33-L58)
  - [auto_release.sh](https://github.com/eea/eea.rancher.catalog/blob/master/templates/volto-ims/auto_release.sh)

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-sentry-rancher-config/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
