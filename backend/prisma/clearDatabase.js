const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearDatabase() {
  console.log("⚠ Deleting all data from tables...");

  try {
    await prisma.$transaction([
      prisma.issuance.deleteMany(),
      prisma.book.deleteMany(),
      prisma.collection.deleteMany(),
      prisma.category.deleteMany(),
      prisma.membership.deleteMany(),
      prisma.member.deleteMany(),
    ]);

    console.log("✅ All data deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
