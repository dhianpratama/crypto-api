# Nimo Test Serverless Microservice

This project is built with Nx monorepo. Each service is using NestJS framework, run with serverless.

## Setup
1. `npm ci`
2. Prepare env variables in `.env` file:
```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_USE_SSL=
SQS_ENDPOINT=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
COINGECKO_API_KEY=
JWT_SECRET_KEY=
```

## Local Dev
1. `nx run-many --target=serve` or `nx serve auth-api` or `nx serve crypto-api`
   1. `https://localhost:3001/dev/test/`
   2. `https://localhost:3002/dev/test/`

## Deploy
1. `nx run-many --target=deploy` or `nx deploy auth-api` or `nx deploy crypto-api`
   1. `https://<api-id>.execute-api.ap-southeast-2.amazonaws.com/dev/test/`

