import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const placesData = JSON.parse(fs.readFileSync('./data/places.json', 'utf8'));

  //   for (const place of placesData) {
  //     await prisma.place.create({
  //       data: {
  //         name: place.name,
  //         description: place.description,
  //         phoneNumber: place.phoneNumber,
  //         email: place.email,
  //         latitude: place.latitude,
  //         longitude: place.longitude,
  //         zipCode: place.zipCode,
  //         address: place.address,
  //         city: place.city,
  //         isCertificated: place.isCertificated,
  //         isValidated: place.isValidated,
  //         openHours: place.openHours,
  //         imageUrl: place.imageUrl,
  //       },
  //     });
  //   }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
