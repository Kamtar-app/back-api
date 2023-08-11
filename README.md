## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma

```bash
# afficher la bdd et les données
$ npx prisma studio

#faire une migration
$ npx prisma migrate dev

# modifier la bdd en ajoutant / supprimant des colonnes, tables ...
$ npx prisma db push

# --no-spec => ignorer le fichier de test
# créer un nouveau module
$ nest g mo nomModule --no-spec

# créer un nouveau controller
$ nest g co nomController --no-spec

# créer un nouveau service
$ nest g s nomService --no-spec
```

## Packages

- bcrypt
- JWT token
- Speackeasy
