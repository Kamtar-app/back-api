## Description

## Installation

```bash
$ npm install

# ajouter la migration à la bdd
$ npx prisma db push

# générer et ajouter de fausses données dans la bdd
$ npx prisma db seed
```

## Prisma

```bash
# visualiser la bdd et les données
$ npx prisma studio

# ajouter la migration à la bdd : modifier la bdd en ajoutant / supprimant des colonnes, tables ...
$ npx prisma db push

# lancer une migration
$ npx prisma migrate dev

# --no-spec => ignorer le fichier de test
# créer un nouveau module
$ nest g mo nomModule --no-spec

# créer un nouveau controller
$ nest g co nomController --no-spec

# créer un nouveau service
$ nest g s nomService --no-spec
```

## Fixtures

```bash
# générer et ajouter de fausses données dans la bdd
$ npx prisma db seed
```

## Packages

- bcrypt : hash password
- JWT token : use to generate token
- OpenAPI (Swagger) : a language-agnostic definition format used to describe RESTful APIs
- FakerJs : library that generates fake (but reasonable) data
