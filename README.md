## Description

## Installation

### Pré-requis sans docker

- node
- npm
- mariadb

### Installation avec docker

#### Insallation des conteneurs

Build de l'image et lancement des conteneurs
```bash
docker-compose up --build -d
```

#### Installation du projet

Pour installer l'app avec docker il est nécéssaire suivre les mêmes étapes que sans docker mais de pré-fixer les commandes par :

```bash
docker exec kamtar-app ...
```

### Installation classique

Installation des dépendances du projet
```bash
npm install
```

Ajout des migrations sur la base de donnée
```bash
npx prisma db push
```

Génération des données fictives dans la bdd
```bash
npx prisma db seed
```

### Commandes Prisma

Visualiser la bdd et les données
```bash
npx prisma studio
```

Ajouter la migration à la bdd : modifier la bdd en ajoutant / supprimant des colonnes, tables ...
```bash
npx prisma db push
```

Lancer les migrations
```bash
npx prisma migrate dev
```

Générer et ajouter les données de tests dans la BDD
```bash
npx prisma db seed
```

### Commandes Nest

Créer un nouveau module
```bash
nest g mo {moduleName} --no-spec
```

Créer un nouveau controller
```bash
nest g co {controllerName} --no-spec
```

Créer un nouveau service
```bash
nest g s {serviceName} --no-spec
```

## Packages

- [bcrypt](https://fr.wikipedia.org/wiki/Bcrypt) : Outil d'hashage de mot de passe
- [JWT token](https://jwt.io/) : Outil d'authentification par token
- [OpenAPI (Swagger)](https://swagger.io/specification/) : Outil de description de l'API
- [FakerJs](https://fakerjs.dev/) : Librairie de générations données fictives
