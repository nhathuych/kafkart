# Kafkart

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

**Kafkart** is a monorepo managed by [Nx](https://nx.dev), designed for building microservices and web applications.
It currently uses:
- **Nx** for build orchestration and dependency graph
- **Express.js** for backend services
- **TypeScript** as the main language

## Run services

To start all services in development mode:
```sh
npm run dev
```
> This runs ```npx nx run-many --target=serve --all --verbose```, meaning Nx will start every service defined under apps/*

## Run tasks

To run the dev server for your app, use:
```sh
npx nx serve auth-service
```

To create a production bundle:
```sh
npx nx build auth-service
```

To see all available targets to run for a project, run:
```sh
npx nx show project auth-service
```

## Generate a new Express service

Before generating, install the Nx plugin for Express:
```sh
nx add @nx/express
```

To generate a new Express service (without E2E tests):
```sh
nx g @nx/express:app api-gateway --directory=apps/api-gateway --e2eTestRunner=none
```
