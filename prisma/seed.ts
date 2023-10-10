import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

const seedData = JSON.parse(fs.readFileSync("prisma/seedData.json", "utf8"));

const seed = async () => {
  try {
    // Assuming the data is in the structure provided in the previous example
    const { Type, Category, Statement } = seedData;

    // Add data to the database using Prisma
    for (const typeData of Type) {
      await prisma.type.create({
        data: {
          ...typeData,
        },
      });
    }

    for (const categoryData of Category) {
      await prisma.category.create({
        data: {
          ...categoryData,
        },
      });
    }

    for (const statementData of Statement) {
      await prisma.statement.create({
        data: {
          ...statementData,
        },
      });
    }

    console.log("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding test data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
