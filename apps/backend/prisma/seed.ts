import { PrismaClient } from "@prisma/client";
import { tmdbMovieSeedData } from "./seedData";

const prisma = new PrismaClient(); // 

async function main() {
  // Clear the table
  await prisma.tMDBMovie.deleteMany();

  // Insert seed data
  const result = await prisma.tMDBMovie.createMany({
    data: tmdbMovieSeedData,
    skipDuplicates: true,
  });

  console.log(`CREATED Movies: ${result.count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
