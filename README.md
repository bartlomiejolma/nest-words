# Nest words

## Description

Implementation of the words project in the [Nest](https://github.com/nestjs/nest) framework

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Database

PostgreSQL database is used.

```
$ psql -U USERNAME

postgres-# CREATE DATABASE nest-words

yarn add @nestjs/config @nestjs/typeorm typeorm pg
```

Provide credentials following the .env.sample file
