const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://neondb_owner:npg_rv9EHXmWux1h@ep-noisy-band-aixxih6k-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
    }
  }
});

async function main() {
  try {
    console.log('Testing database connection (Port 6543 - Pooling)...');
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Connection failed (Port 6543):');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
