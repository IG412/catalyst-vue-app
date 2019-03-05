# Catalyst | Vue WebApp

This is the repo for Not-Equal Catalyst's frontend webapp.
It is a [Vue.js](https://vuejs.org/) project written in JavaScript,
[pug](https://pugjs.org) and [sass](https://sass-lang.com/) and deployed through [Docker](https://www.docker.com/) where it is served using [express](https://expressjs.com/) and [vue-ssr](https://ssr.vuejs.org/).

[What is Not-Equal Catalyst?](https://github.com/unplatform/catalyst-about)

<!-- toc-head -->

## Table of Contents

- [Development](#development)
  - [Setup](#setup)
  - [Regular use](#regular-use)
  - [Irregular use](#irregular-use)
  - [Code Structure](#code-structure)
  - [Webpack build](#webpack-build)
  - [Code formatting](#code-formatting)
- [Deployment](#deployment)
  - [Building the image](#building-the-image)
  - [Using the image](#using-the-image)
  - [Environment variables](#environment-variables)
- [Future work](#future-work)

<!-- toc-tail -->

## Development

### Setup

To develop on this repo you will need to have [Docker](https://www.docker.com/) and
[node.js](https://nodejs.org) installed on your dev machine and have an understanding of them.
This guide assumes you have the repo checked out and are on macOS, but equivalent commands are available.
You will also need a Trello account which is used to pull the data from.

You'll only need to follow this setup once for your dev machine.

```bash
# Install dependancies
npm install

# Setup your client environment
cp .env.example .env.local

# Follow these instructions to get your Trello credentials
open https://github.com/unplatform/catalyst-trello-scraper#setup

# Setup your server environment
cp .env.server.example .env.server.local
```

### Regular use

These are the commands you'll regularly run to develop the API, in no particular order.

```bash
# Start up a redis instance, fetch projects and serve them with the api
# -> Run this in a new terminal tab
# -> Stop this with a Ctrl+C
# -> See `docker-compose.yml` for how it works
docker-compuse up

# Compile and run the vue-cli-service's server
# -> Internally uses webpack to transpile assets to html, css & js
# -> Stop this with a Ctrl+C
# -> Only runs the client, no ssr yet
npm run serve
open http://localhost:8080
```

### Irregular use

These are commands you might need to run but probably won't, also in no particular order.

```bash
# Generate the table of contents for this readme
# -> It'll replace content between the toc-head and toc-tail HTML comments
npm run gen-readme-toc

# Manually lint code with TypeScript's `tsc`
npm run lint

# Manually format code
# -> This repo is setup to automatically format code on git-push
npm run prettier

# Manually build all assets (html, css, js & images)
# -> Runs both the other build commands together
# -> Writes to dist/
npm run build

# Manually build the assets for the client
npm run build:client

# Manually build the assets for the server (creates a vue-ssr-server-bundle-json)
npm run build:client

# Run the ssr server
# -> Requires .env.server.local to be setup
# -> Stop this with a Ctrl+C
# -> Just runs the server, no file watching or restarting
node server/index.js
```

### Code Structure

| Folder         | Contents                                          |
| -------------- | ------------------------------------------------- |
| dist           | Where the html, css, js & img assets are built to |
| node_modules   | Where npm's modules get installed into            |
| public         | Unmodified assets, served directly to the client  |
| server         | The source code for the vue-ssr express server    |
| src            | The source code for the web app                   |
| src/assets     | Image assets that are built into the app          |
| src/components | Reusable Vue components                           |
| src/data       | Static information for the web app                |
| src/sass       | Custom styles written in sass                     |
| src/views      | The app's views, components which are routed to   |

### Webpack build

This repo uses [vue-cli-service](https://cli.vuejs.org/) to handle most webpack configuration,
including `babel`, `post-css` and processing `.vue` components.
There are some tweaks to the defaults, these can be found in [vue.config.js](/vue.config.js) and are detailed below.

- [shared.sass](/src/shared.sass) is automatically imported for each Vue component's `<style>` tags (with variables and mixins)
- `process.env.VUE_APP_VERSION` is set to the package.json version
- It adds `vue-svg-loader`
- It sets up the required things for vue-ssr

### Code formatting

This repo uses [Prettier](https://prettier.io/) to automatically format code to a consistent standard.
This works using the [husky](https://www.npmjs.com/package/husky)
and [lint-staged](https://www.npmjs.com/package/lint-staged) packages to
automatically format code whenever you commit code.
This means that code that is pushed to the repo is always formatted to a consistent standard.

You can manually run the formatter with `npm run prettier` if you want.

Prettier is slightly configured in [.prettierrc.yml](/.prettierrc.yml)
and also ignores files using [.prettierignore](/.prettierignore).

## Deployment

### Building the image

This repo uses a [GitLab CI](https://about.gitlab.com/product/continuous-integration/)
to build a Docker image when you push a git tag.
This is designed to be used with the `npm version` command so all docker images are [semantically versioned](https://semver.org/).
The `:latest` docker tag is not used.

This job runs using the [.gitlab-ci.yml](/.gitlab-ci.yml) file which
runs a docker build using the [Dockerfile](/Dockerfile)
and **only** runs when you push a [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

It pushes these docker images to the GitLab registry of the repo.
A slight nuance is that it will replace a preceding `v` in tag names, formatting `v1.0.0` to `1.0.0`.

```bash
# Deploy a new version of the CLI
npm version # major | minor | patch
git push --tags
open https://openlab.ncl.ac.uk/gitlab/catalyst/vue-webapp/pipelines
```

### Using the image

With this docker image you can easily deploy and run the vue-ssr server using docker-compose.
The express server runs on `8080` inside the container, so you'll need to map that for external traffic.

Here's an example with docker-compose:

> For more info see [catalyst-example-stack](https://github/com/unplatform/catalyst-example-stack)

```yml
version: '3'

services:
  web-ui:
    image: openlab.ncl.ac.uk:4567/catalyst/vue-webapp:0.1.0
    ports:
      - 8080:8080
    environment:
      PUBLIC_URL: https://catalyst.not-equal.tech
      API_URL: https://api.catalyst.not-equal.tech
      REDIS_URL: redis://your_redis_url
```

### Environment variables

There are some required environment variables, shown below.

| Variable   | Description                                           |
| ---------- | ----------------------------------------------------- |
| REDIS_URL  | The redis connection uri                              |
| PUBLIC_URL | Where the app is, used for generating opengraph meta  |
| API_URL    | Where the api is, passed into the webapp through vuex |

## Future work

> Coming soon

---

> The code on https://github.com/unplatform/catalyst-vue-webapp is a mirror of https://openlab.ncl.ac.uk/gitlab/catalyst/vue-webapp
