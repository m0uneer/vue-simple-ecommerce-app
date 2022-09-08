[![CI/CD Pipeline](https://github.com/m0uneer/vue-simple-ecommerce-app/actions/workflows/workflow.yml/badge.svg)](https://github.com/m0uneer/vue-simple-ecommerce-app/actions/workflows/workflow.yml)
[![codecov](https://codecov.io/gh/m0uneer/vue-simple-ecommerce-app/branch/main/graph/badge.svg?token=NT195G23E3)](https://codecov.io/gh/m0uneer/vue-simple-ecommerce-app)

# vue-simple-ecommerce-app

## Project setup

```shell=
$ npm install
```

### Compiles and hot-reloads for development

```shell=
$ npm run serve
```

### Compiles and minifies for production

```shell=
$ npm run build
```

### Run your unit tests

```shell=
$ npm run test:unit
```

### Run your end-to-end tests

```shell=
npm run test:e2e
```

### Lints and fixes files

```shell=
npm run lint
```

## What is included
- [x] Simple UI with Bulma framework
- [x] Products crud that support uploading product images
- [x] User register/login with JWT
- [x] Simple validation
- [x] State management using Vuex
- [x] `ApiService` to globally support interceptors to add headers, retrying requests and handle API errors.
- [x] `EventBusService` to require authentication if access token is invalid or missing
- [x] `TokenService` to encapsulate the storage of the access token to provide low-coupling, more flexibility, and testability
- [x] Architectural designs: MVC, Modular and Atomic
- [x] Refreshing token mechanism with `HttpInterceptorService` to retry the API request again without generating a new
  token
- [x] Single point of app configuration management `config.js` that can support different environments
- [x] Unit tests with Jest. Check productList.spec.js and productAdd.spec.js
- [x] Integration test with Cypress. Check userAuth.e2e.spec.js
- [x] Coverage with Codecov
- [x] Linters
- [x] Semantic releasing to manage package versions and generate changelog documentation
- [x] CICD Pipeline with Github actions. It checks npm audit, lint, run tests, upload to Codecov, deploy, and semantic
  release
- [x] Conventional commit messages with Git-cz and Husky

## Live

https://vue-simple-ecommerce-app.web.app/

## Backend Koa repository

https://github.com/m0uneer/simple-ecommerce-koa-server
