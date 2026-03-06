const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Seeding users...');

  // 1. Create/Update Admin
  const salt = await bcrypt.genSalt(10);
  const adminPwd = await bcrypt.hash('admin123', salt);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@abheepay.com' },
    update: { password: adminPwd },
    create: { name: 'Admin User', email: 'admin@abheepay.com', mobile: '9999999999', password: adminPwd, role: 'ADMIN', walletBalance: 1000000, isActive: true }
  });

  // 2. Create/Update SD linked to Admin
  const sdPwd = await bcrypt.hash('sd123', salt);
  const sd = await prisma.user.upsert({
    where: { email: 'sd@abheepay.com' },
    update: { password: sdPwd, parentId: admin.id },
    create: { name: 'SD User', email: 'sd@abheepay.com', mobile: '8888888888', password: sdPwd, role: 'SUPER_DISTRIBUTOR', parentId: admin.id, walletBalance: 500000, isActive: true }
  });

  // 3. Create/Update MD linked to SD
  const mdPwd = await bcrypt.hash('md123', salt);
  const md = await prisma.user.upsert({
    where: { email: 'md@abheepay.com' },
    update: { password: mdPwd, parentId: sd.id },
    create: { name: 'MD User', email: 'md@abheepay.com', mobile: '7777777777', password: mdPwd, role: 'MASTER_DISTRIBUTOR', parentId: sd.id, walletBalance: 200000, isActive: true }
  });

  // 4. Create/Update Distributor linked to MD
  const distPwd = await bcrypt.hash('dist123', salt);
  const dist = await prisma.user.upsert({
    where: { email: 'dist@abheepay.com' },
    update: { password: distPwd, parentId: md.id },
    create: { name: 'Distributor User', email: 'dist@abheepay.com', mobile: '6666666666', password: distPwd, role: 'DISTRIBUTOR', parentId: md.id, walletBalance: 100000, isActive: true }
  });

  // 5. Create/Update Retailer linked to Distributor
  const retPwd = await bcrypt.hash('retailer123', salt);
  const retailer = await prisma.user.upsert({
    where: { email: 'retailer@abheepay.com' },
    update: { password: retPwd, parentId: dist.id },
    create: { name: 'Retailer User', email: 'retailer@abheepay.com', mobile: '5555555555', password: retPwd, role: 'RETAILER', parentId: dist.id, walletBalance: 50000, isActive: true }
  });

  console.log('Hierarchy seeded: Admin -> SD -> MD -> Dist -> Retailer');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
