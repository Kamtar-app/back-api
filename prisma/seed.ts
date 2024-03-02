import { PrismaClient, Role, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.categoriesPlaces.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE CategoriesPlaces AUTO_INCREMENT = 1;`;
  await prisma.rate.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Rate AUTO_INCREMENT = 1;`;
  await prisma.favoriteDestination.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE FavoriteDestination AUTO_INCREMENT = 1;`;
  await prisma.comment.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Comment AUTO_INCREMENT = 1;`;
  await prisma.report.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Report AUTO_INCREMENT = 1;`;
  await prisma.favoritePlaceUser.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE FavoritePlaceUser AUTO_INCREMENT = 1;`;
  await prisma.truck.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Truck AUTO_INCREMENT = 1;`;
  await prisma.place.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Place AUTO_INCREMENT = 1;`;
  await prisma.user.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
  await prisma.userFriends.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE UserFriends AUTO_INCREMENT = 1;`;
  await prisma.role.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Role AUTO_INCREMENT = 1;`;
  await prisma.rank.deleteMany({});
  // await prisma.$executeRaw`ALTER TABLE Rank AUTO_INCREMENT = 1;`;

  await prisma.liveInfo.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE LiveInfo AUTO_INCREMENT = 1;`;
  await prisma.liveInfoType.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE LiveInfoType AUTO_INCREMENT = 1;`;
  await prisma.category.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1;`;

  const amountOfUsers = 5;

  const users = [];
  const rolesId = [];
  const placesId = [];
  const usersId = [];
  const categoriesId = [];
  const ranks = [];
  const categories = [];
  const liveInfos = [];
  const liveInfoTypes = [];
  const userFriends = [];
  const trucks = [];
  const favoritesPlaceUser = [];
  const reports = [];
  // const comments = [];
  const rates = [];
  const favoriteDestinations = [];
  const categoriesPlaces = [];

  const roles = [
    { roleName: 'Administrateur' },
    { roleName: 'Contributeur' },
    { roleName: 'Utilisateur' },
  ];

  for (let i = 0; i < roles.length; i++) {
    const createdRole = await prisma.role.create({ data: roles[i] });
    rolesId.push(createdRole.id);
  }

  for (let x = 0; x < amountOfUsers; x++) {
    let chooseRandomRole = Math.floor(Math.random() * roles.length);

    const user = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'profil' }),
      companyName: faker.company.name(),
      siret: faker.number.hex(),
      phoneNumber: faker.phone.number('+33 # ## ## ## ##'),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isVisibleOnMap: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      roleId: rolesId[chooseRandomRole],
    };

    const createdUser = await prisma.user.create({ data: user });
    usersId.push(createdUser.id);
  }

  for (let j = 0; j < amountOfUsers; j++) {
    const userFriend = {
      isAccepted: faker.datatype.boolean(),
    };

    const rank = {
      name: faker.word.noun(),
      iconPath: faker.image.url(),
      importance: faker.number.int({ min: 1, max: 10 }),
    };

    const category = {
      name: faker.word.noun(),
      createdAt: faker.date.past(),
    };

    const categorySaved = await prisma.category.create({ data: category });
    categoriesId.push(categorySaved.id);

    const liveInfo = {
      dateLiveInfo: faker.date.past(),
      content: faker.lorem.text(),
    };

    const liveInfoType = {
      label: faker.word.noun(),
    };

    userFriends.push(userFriend);
    ranks.push(rank);
    liveInfos.push(liveInfo);
    liveInfoTypes.push(liveInfoType);
  }

  const usersSaved = await prisma.user.createMany({ data: users });
  const usersFriendSaved = await prisma.userFriends.createMany({
    data: userFriends,
  });
  const ranksSaved = await prisma.rank.createMany({ data: ranks });

  const liveInfosSaved = await prisma.liveInfo.createMany({
    data: liveInfos,
  });
  const liveInfoTypesSaved = await prisma.liveInfoType.createMany({
    data: liveInfoTypes,
  });

  const placeInRoad = [
    { latitude: 47.706827, longitude: -1.759981 },
    { latitude: 47.939227, longitude: -1.639513 },
    { latitude: 47.993966, longitude: -1.672214 },
    { latitude: 47.762892, longitude: -1.669468 },
    { latitude: 47.421918, longitude: -1.70633 },
  ];

  for (let z = 0; z < amountOfUsers; z++) {
    const place = {
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      latitude: placeInRoad[z].latitude,
      longitude: placeInRoad[z].longitude,
      zipCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      isCertificated: faker.datatype.boolean(),
      isValidated: faker.datatype.boolean(),
      openHours: faker.word.noun(),
      // averageRates: faker.number.float({ min: 1, max: 5, precision: 0.01 }),
      imageUrl: faker.image.urlLoremFlickr({ category: 'restaurant' }),
      createdAt: faker.date.past(),
      userId: usersId[z],
    };

    const createdPlace = await prisma.place.create({ data: place });
    placesId.push(createdPlace.id);

    const truck = {
      name: faker.vehicle.vehicle(),
      length: faker.number.float({ min: 5, max: 15, precision: 0.01 }),
      width: faker.number.float({ min: 2, max: 4, precision: 0.01 }),
      height: faker.number.float({ min: 2, max: 4, precision: 0.01 }),
      weight: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }),
      hasDangerousSubstance: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      userId: usersId[z],
    };

    trucks.push(truck);
  }

  const trucksSaved = await prisma.truck.createMany({
    data: trucks,
  });

  for (let a = 0; a < amountOfUsers; a++) {
    const favoritePlaceUser = {
      userId: usersId[a],
      placeId: placesId[a],
    };

    const report = {
      content: faker.lorem.paragraph(),
      isTreated: faker.datatype.boolean(),
      userId: usersId[a],
      placeId: placesId[a],
    };

    // const comment = {
    //   content: faker.lorem.paragraph(),
    //   createdAt: faker.date.past(),
    //   userId: usersId[a],
    //   placeId: placesId[a],
    // };

    const numberOfRates = faker.number.int({ min: 1, max: 5 });
    for (let n = 0; n < numberOfRates; n++) {
      const rate = {
        value: faker.number.int({ min: 1, max: 5 }),
        content: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        userId: usersId[a],
        placeId: placesId[a],
      };
      rates.push(rate);
    }

    const favoriteDestination = {
      latitude: faker.number.float({ min: -90, max: 90 }),
      longitude: faker.number.float({ min: -180, max: 180 }),
      zipCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      createdAt: faker.date.past(),
      userId: usersId[a],
    };

    const categoryPlace = {
      placeId: placesId[a],
      categoryId: categoriesId[a],
    };

    favoritesPlaceUser.push(favoritePlaceUser);
    reports.push(report);
    // comments.push(comment);
    favoriteDestinations.push(favoriteDestination);
    categoriesPlaces.push(categoryPlace);
  }

  const favoritesPlaceUserSaved = await prisma.favoritePlaceUser.createMany({
    data: favoritesPlaceUser,
  });

  const reportsSaved = await prisma.report.createMany({
    data: reports,
  });

  // const commentsSaved = await prisma.comment.createMany({
  //   data: comments,
  // });

  const ratesSaved = await prisma.rate.createMany({
    data: rates,
  });

  const favoriteDestinationsSaved = await prisma.favoriteDestination.createMany(
    {
      data: favoriteDestinations,
    },
  );

  const categoriesPlacesSaved = await prisma.categoriesPlaces.createMany({
    data: categoriesPlaces,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
