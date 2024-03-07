import { PrismaClient, Role, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
var fakeDatas = require('./../fake-datas.json');

const prisma = new PrismaClient();

async function main() {
  await prisma.categoriesPlaces.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE CategoriesPlaces AUTO_INCREMENT = 1;`;
  await prisma.rate.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Rate AUTO_INCREMENT = 1;`;
  await prisma.favoriteDestination.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE FavoriteDestination AUTO_INCREMENT = 1;`;
  await prisma.report.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Report AUTO_INCREMENT = 1;`;
  await prisma.favoritePlaceUser.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE FavoritePlaceUser AUTO_INCREMENT = 1;`;
  await prisma.truck.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Truck AUTO_INCREMENT = 1;`;
  await prisma.userFriends.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE UserFriends AUTO_INCREMENT = 1;`;
  await prisma.liveInfo.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE LiveInfo AUTO_INCREMENT = 1;`;
  await prisma.liveInfoType.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE LiveInfoType AUTO_INCREMENT = 1;`;
  await prisma.category.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Category AUTO_INCREMENT = 1;`;
  await prisma.place.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Place AUTO_INCREMENT = 1;`;
  await prisma.user.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE User AUTO_INCREMENT = 1;`;
  await prisma.role.deleteMany({});
  await prisma.$executeRaw`ALTER TABLE Role AUTO_INCREMENT = 1;`;
  await prisma.rank.deleteMany({});
  // await prisma.$executeRaw`ALTER TABLE Rank AUTO_INCREMENT = 1;`;

  // roles
  const rolesId = [];
  for (let i = 0; i < fakeDatas.roles.length; i++) {
    const createdRole = await prisma.role.create({ data: fakeDatas.roles[i] });
    rolesId.push(createdRole.id);
  }

  // ranks
  const ranksId = [];
  for (let x = 0; x < fakeDatas.ranks.length; x++) {
    const createdRank = await prisma.rank.create({ data: fakeDatas.ranks[x] });
    ranksId.push(createdRank.id);
  }

  // users
  const usersCount = 5;
  const usersId = [];
  for (let i = 0; i < usersCount; i++) {
    let randomRoleId = Math.floor(Math.random() * fakeDatas.roles.length);
    let randomRankId = Math.floor(Math.random() * fakeDatas.ranks.length);

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
      roleId: rolesId[randomRoleId],
      rankId: ranksId[randomRankId],
      latitude: fakeDatas.usersPositions[i].latitude,
      longitude: fakeDatas.usersPositions[i].longitude,
    };

    const createdUser = await prisma.user.create({ data: user });
    usersId.push(createdUser.id);
  }

  // categories
  const categoriesId = [];
  for (let i = 0; i < fakeDatas.categories.length; i++) {
    const createdCategory = await prisma.category.create({
      data: {
        ...fakeDatas.categories[i],
        createdAt: faker.date.past(),
      },
    });
    categoriesId.push(createdCategory.id);
  }

  // userFriends && liveInfo && liveInfoType
  const loopCount = 5;
  const liveInfos = [];
  const liveInfoTypes = [];
  const userFriends = [];
  for (let j = 0; j < loopCount; j++) {
    const userFriend = {
      isAccepted: faker.datatype.boolean(),
    };

    const liveInfo = {
      dateLiveInfo: faker.date.past(),
      content: faker.lorem.text(),
    };

    const liveInfoType = {
      label: faker.word.noun(),
    };

    userFriends.push(userFriend);
    liveInfos.push(liveInfo);
    liveInfoTypes.push(liveInfoType);
  }

  const usersFriendSaved = await prisma.userFriends.createMany({
    data: userFriends,
  });
  const liveInfosSaved = await prisma.liveInfo.createMany({ data: liveInfos });
  const liveInfoTypesSaved = await prisma.liveInfoType.createMany({
    data: liveInfoTypes,
  });

  // trucks
  const trucks = [];
  const trucksCount = 5;
  for (let x = 0; x < trucksCount; x++) {
    let randomUserId = Math.floor(Math.random() * usersId.length);
    const truck = {
      name: faker.vehicle.vehicle(),
      length: faker.number.float({ min: 5, max: 15, precision: 0.01 }),
      width: faker.number.float({ min: 2, max: 4, precision: 0.01 }),
      height: faker.number.float({ min: 2, max: 4, precision: 0.01 }),
      weight: faker.number.float({ min: 1000, max: 5000, precision: 0.01 }),
      hasDangerousSubstance: faker.datatype.boolean(),
      createdAt: faker.date.past(),
      userId: usersId[randomUserId],
    };

    trucks.push(truck);
  }

  const trucksSaved = await prisma.truck.createMany({ data: trucks });

  // places
  const placesId = [];
  for (let x = 0; x < fakeDatas.places.length; x++) {
    let randomUserId = Math.floor(Math.random() * usersId.length);
    const place = {
      ...fakeDatas.places[x],
      imageUrl: faker.image.urlLoremFlickr({ category: 'restaurant' }),
      createdAt: faker.date.past(),
      userId: usersId[randomUserId],
    };

    const createdPlace = await prisma.place.create({ data: place });
    placesId.push(createdPlace.id);
  }

  // favoritePlaceUser && report && numberOfRates && rates && favoriteDestination && categoryPlace
  const rates = [];
  const favoritesPlaceUser = [];
  const reports = [];
  const favoriteDestinations = [];
  const categoriesPlaces = [];

  for (let a = 0; a < usersCount; a++) {
    let randomUserId = Math.floor(Math.random() * usersId.length);
    let randomPlaceId = Math.floor(Math.random() * placesId.length);
    let randomCategoryId = Math.floor(Math.random() * categoriesId.length);

    const favoritePlaceUser = {
      userId: usersId[randomUserId],
      placeId: placesId[randomPlaceId],
    };

    const report = {
      content: faker.lorem.paragraph(),
      isTreated: faker.datatype.boolean(),
      userId: usersId[randomUserId],
      placeId: placesId[randomPlaceId],
    };

    // const numberOfRates = faker.number.int({ min: 1, max: 5 });
    for (let n = 0; n < placesId.length; n++) {
      let randomRateCommentId = Math.floor(
        Math.random() * fakeDatas.categories.length,
      );

      const rate = {
        value: faker.number.int({ min: 1, max: 5 }),
        content: fakeDatas.rateContent[randomRateCommentId].content,
        createdAt: faker.date.past(),
        userId: usersId[randomUserId],
        placeId: placesId[n],
      };
      rates.push(rate);
    }

    let randomFavoriteDestinationId = Math.floor(
      Math.random() * fakeDatas.destinations.length,
    );
    const favoriteDestination = {
      ...fakeDatas.destinations[randomFavoriteDestinationId],
      createdAt: faker.date.past(),
      userId: usersId[randomUserId],
    };

    favoritesPlaceUser.push(favoritePlaceUser);
    reports.push(report);
    favoriteDestinations.push(favoriteDestination);
  }

  for (let n = 0; n < placesId.length; n++) {
    let randomCategoryId = Math.floor(Math.random() * categoriesId.length);

    const categoryPlace = {
      placeId: placesId[n],
      categoryId: categoriesId[randomCategoryId],
    };

    categoriesPlaces.push(categoryPlace);
  }

  const favoritesPlaceUserSaved = await prisma.favoritePlaceUser.createMany({
    data: favoritesPlaceUser,
  });
  const reportsSaved = await prisma.report.createMany({ data: reports });
  const ratesSaved = await prisma.rate.createMany({ data: rates });
  const favoriteDestinationsSaved = await prisma.favoriteDestination.createMany(
    { data: favoriteDestinations },
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
