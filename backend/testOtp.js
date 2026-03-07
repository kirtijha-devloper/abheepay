const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getOtp() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@abheepay.com' } });
  console.log('--- OTP:', user.otp, '---');
  await prisma.$disconnect();
}

getOtp();
