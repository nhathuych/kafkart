# Kafkart

## Installation

Install dependencies:
```bash
pnpm i
```

Set up environment variables:
```bash
cp env.example .env
```

## Run services

To start all services in development mode:
```sh
turbo dev
```

## Migration

### product-service:

Create & migrate:
```sh
cd packages/product-db
pnpm prisma migrate dev

cd ../..
turbo db:generate
```

Show database:
```sh
cd packages/product-db
pnpm prisma studio
```
> Prisma Studio is up on http://localhost:5555
