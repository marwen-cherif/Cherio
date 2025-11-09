import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cherio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Vérifier si l'admin existe déjà
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('Admin user already exists:', adminEmail);
    return;
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Créer l'utilisateur admin
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      encryptedPassword: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      emailVerified: true,
    },
  });

  console.log('Admin user created successfully:', {
    id: admin.id,
    email: admin.email,
    role: admin.role,
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
