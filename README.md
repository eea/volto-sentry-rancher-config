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


[Volto](https://github.com/plone/volto) add-on

## Features

Demo GIF

## Getting started

### Try volto-sentry-rancher-config with Docker

      git clone https://github.com/eea/volto-sentry-rancher-config.git
      cd volto-sentry-rancher-config
      make
      make start

Go to http://localhost:3000

### Add volto-sentry-rancher-config to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-sentry-rancher-config"
   ],

   "dependencies": {
       "@eeacms/volto-sentry-rancher-config": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-sentry-rancher-config
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

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
