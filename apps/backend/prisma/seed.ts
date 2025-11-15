import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Helper function to create slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to create multilingual object
function createMultilingual(fr: string, en: string, ar: string) {
  return {
    fr,
    en,
    ar,
  };
}

// Helper function to create multilingual slug
function createMultilingualSlug(fr: string, en: string, ar: string) {
  return {
    fr: createSlug(fr),
    en: createSlug(en),
    ar: createSlug(ar),
  };
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cherio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Vérifier si l'admin existe déjà
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
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
  } else {
    console.log('Admin user already exists:', adminEmail);
  }

  // Check if categories already exist
  const existingCategories = await prisma.category.count();
  if (existingCategories > 0) {
    console.log('Categories already exist, skipping category seed');
    return;
  }

  console.log('Creating category tree...');

  // ============================================
  // LEVEL 1: Main Categories
  // ============================================

  // Electronics
  const electronics = await prisma.category.create({
    data: {
      name: createMultilingual('Électronique', 'Electronics', 'إلكترونيات'),
      slug: createMultilingualSlug('Électronique', 'Electronics', 'إلكترونيات'),
      description: createMultilingual(
        'Tous les produits électroniques et technologiques',
        'All electronic and technological products',
        'جميع المنتجات الإلكترونية والتكنولوجية'
      ),
      sortOrder: 1,
    },
  });

  // Fashion & Beauty
  const fashionBeauty = await prisma.category.create({
    data: {
      name: createMultilingual('Mode & Beauté', 'Fashion & Beauty', 'الموضة والجمال'),
      slug: createMultilingualSlug('Mode & Beauté', 'Fashion & Beauty', 'الموضة والجمال'),
      description: createMultilingual(
        'Produits de mode, beauté et accessoires',
        'Fashion, beauty and accessory products',
        'منتجات الموضة والجمال والإكسسوارات'
      ),
      sortOrder: 2,
    },
  });

  // Home & Living
  const homeLiving = await prisma.category.create({
    data: {
      name: createMultilingual('Maison & Décoration', 'Home & Living', 'المنزل والديكور'),
      slug: createMultilingualSlug('Maison & Décoration', 'Home & Living', 'المنزل والديكور'),
      description: createMultilingual(
        'Articles pour la maison et la décoration',
        'Home and decoration items',
        'أدوات المنزل والديكور'
      ),
      sortOrder: 3,
    },
  });

  // Sports & Outdoors
  const sportsOutdoors = await prisma.category.create({
    data: {
      name: createMultilingual('Sport & Plein Air', 'Sports & Outdoors', 'الرياضة والهواء الطلق'),
      slug: createMultilingualSlug('Sport & Plein Air', 'Sports & Outdoors', 'الرياضة والهواء الطلق'),
      description: createMultilingual(
        'Équipements sportifs et activités de plein air',
        'Sports equipment and outdoor activities',
        'معدات رياضية وأنشطة في الهواء الطلق'
      ),
      sortOrder: 4,
    },
  });

  console.log('Level 1 categories created');

  // ============================================
  // LEVEL 2: Sub-Categories
  // ============================================

  // Electronics > Computer Accessories
  const computerAccessories = await prisma.category.create({
    data: {
      name: createMultilingual('Accessoires Informatique', 'Computer Accessories', 'إكسسوارات الكمبيوتر'),
      slug: createMultilingualSlug('Accessoires Informatique', 'Computer Accessories', 'إكسسوارات الكمبيوتر'),
      description: createMultilingual(
        'Accessoires pour ordinateurs et périphériques',
        'Computer and peripheral accessories',
        'إكسسوارات الكمبيوتر والطرفيات'
      ),
      parentId: electronics.id,
      sortOrder: 1,
    },
  });

  // Electronics > Mobile & Tablets
  const mobileTablets = await prisma.category.create({
    data: {
      name: createMultilingual('Mobile & Tablettes', 'Mobile & Tablets', 'الهواتف والأجهزة اللوحية'),
      slug: createMultilingualSlug('Mobile & Tablettes', 'Mobile & Tablets', 'الهواتف والأجهزة اللوحية'),
      description: createMultilingual(
        'Smartphones, tablettes et accessoires mobiles',
        'Smartphones, tablets and mobile accessories',
        'الهواتف الذكية والأجهزة اللوحية وإكسسواراتها'
      ),
      parentId: electronics.id,
      sortOrder: 2,
    },
  });

  // Electronics > Audio & Video
  const audioVideo = await prisma.category.create({
    data: {
      name: createMultilingual('Audio & Vidéo', 'Audio & Video', 'الصوت والفيديو'),
      slug: createMultilingualSlug('Audio & Vidéo', 'Audio & Video', 'الصوت والفيديو'),
      description: createMultilingual(
        'Équipements audio et vidéo',
        'Audio and video equipment',
        'معدات الصوت والفيديو'
      ),
      parentId: electronics.id,
      sortOrder: 3,
    },
  });

  // Fashion & Beauty > Hair Accessories
  const hairAccessories = await prisma.category.create({
    data: {
      name: createMultilingual('Accessoires Cheveux', 'Hair Accessories', 'إكسسوارات الشعر'),
      slug: createMultilingualSlug('Accessoires Cheveux', 'Hair Accessories', 'إكسسوارات الشعر'),
      description: createMultilingual(
        'Accessoires et produits pour les cheveux',
        'Hair accessories and products',
        'إكسسوارات ومنتجات الشعر'
      ),
      parentId: fashionBeauty.id,
      sortOrder: 1,
    },
  });

  // Fashion & Beauty > Jewelry
  const jewelry = await prisma.category.create({
    data: {
      name: createMultilingual('Bijoux', 'Jewelry', 'المجوهرات'),
      slug: createMultilingualSlug('Bijoux', 'Jewelry', 'المجوهرات'),
      description: createMultilingual(
        'Bijoux et accessoires de mode',
        'Jewelry and fashion accessories',
        'المجوهرات وإكسسوارات الموضة'
      ),
      parentId: fashionBeauty.id,
      sortOrder: 2,
    },
  });

  // Fashion & Beauty > Cosmetics
  const cosmetics = await prisma.category.create({
    data: {
      name: createMultilingual('Cosmétiques', 'Cosmetics', 'مستحضرات التجميل'),
      slug: createMultilingualSlug('Cosmétiques', 'Cosmetics', 'مستحضرات التجميل'),
      description: createMultilingual(
        'Produits cosmétiques et de beauté',
        'Cosmetics and beauty products',
        'منتجات التجميل والجمال'
      ),
      parentId: fashionBeauty.id,
      sortOrder: 3,
    },
  });

  // Home & Living > Kitchen
  const kitchen = await prisma.category.create({
    data: {
      name: createMultilingual('Cuisine', 'Kitchen', 'المطبخ'),
      slug: createMultilingualSlug('Cuisine', 'Kitchen', 'المطبخ'),
      description: createMultilingual(
        'Ustensiles et accessoires de cuisine',
        'Kitchen utensils and accessories',
        'أدوات وإكسسوارات المطبخ'
      ),
      parentId: homeLiving.id,
      sortOrder: 1,
    },
  });

  // Home & Living > Decoration
  const decoration = await prisma.category.create({
    data: {
      name: createMultilingual('Décoration', 'Decoration', 'الديكور'),
      slug: createMultilingualSlug('Décoration', 'Decoration', 'الديكور'),
      description: createMultilingual(
        'Articles de décoration intérieure',
        'Interior decoration items',
        'أدوات الديكور الداخلي'
      ),
      parentId: homeLiving.id,
      sortOrder: 2,
    },
  });

  // Sports & Outdoors > Fitness
  const fitness = await prisma.category.create({
    data: {
      name: createMultilingual('Fitness', 'Fitness', 'اللياقة البدنية'),
      slug: createMultilingualSlug('Fitness', 'Fitness', 'اللياقة البدنية'),
      description: createMultilingual(
        'Équipements de fitness et musculation',
        'Fitness and strength training equipment',
        'معدات اللياقة البدنية وكمال الأجسام'
      ),
      parentId: sportsOutdoors.id,
      sortOrder: 1,
    },
  });

  // Sports & Outdoors > Outdoor Activities
  const outdoorActivities = await prisma.category.create({
    data: {
      name: createMultilingual('Activités Plein Air', 'Outdoor Activities', 'الأنشطة الخارجية'),
      slug: createMultilingualSlug('Activités Plein Air', 'Outdoor Activities', 'الأنشطة الخارجية'),
      description: createMultilingual(
        'Équipements pour activités de plein air',
        'Outdoor activity equipment',
        'معدات الأنشطة الخارجية'
      ),
      parentId: sportsOutdoors.id,
      sortOrder: 2,
    },
  });

  console.log('Level 2 categories created');

  // ============================================
  // LEVEL 3: Sub-Sub-Categories
  // ============================================

  // Computer Accessories > Mouse
  const mouse = await prisma.category.create({
    data: {
      name: createMultilingual('Souris', 'Mouse', 'الماوس'),
      slug: createMultilingualSlug('Souris', 'Mouse', 'الماوس'),
      description: createMultilingual(
        'Souris d\'ordinateur filaires et sans fil',
        'Wired and wireless computer mice',
        'فأرة الكمبيوتر السلكية واللاسلكية'
      ),
      parentId: computerAccessories.id,
      sortOrder: 1,
    },
  });

  // Computer Accessories > Keyboards
  const keyboards = await prisma.category.create({
    data: {
      name: createMultilingual('Claviers', 'Keyboards', 'لوحات المفاتيح'),
      slug: createMultilingualSlug('Claviers', 'Keyboards', 'لوحات المفاتيح'),
      description: createMultilingual(
        'Claviers mécaniques et standards',
        'Mechanical and standard keyboards',
        'لوحات المفاتيح الميكانيكية والقياسية'
      ),
      parentId: computerAccessories.id,
      sortOrder: 2,
    },
  });

  // Computer Accessories > Webcams
  const webcams = await prisma.category.create({
    data: {
      name: createMultilingual('Webcams', 'Webcams', 'كاميرات الويب'),
      slug: createMultilingualSlug('Webcams', 'Webcams', 'كاميرات الويب'),
      description: createMultilingual(
        'Caméras web pour visioconférence',
        'Web cameras for video conferencing',
        'كاميرات الويب للمؤتمرات المرئية'
      ),
      parentId: computerAccessories.id,
      sortOrder: 3,
    },
  });

  // Hair Accessories > Hair Clips
  const hairClips = await prisma.category.create({
    data: {
      name: createMultilingual('Barrettes', 'Hair Clips', 'مشابك الشعر'),
      slug: createMultilingualSlug('Barrettes', 'Hair Clips', 'مشابك الشعر'),
      description: createMultilingual(
        'Barrettes et pinces à cheveux',
        'Hair clips and hairpins',
        'مشابك ودبابيس الشعر'
      ),
      parentId: hairAccessories.id,
      sortOrder: 1,
    },
  });

  // Hair Accessories > Hair Bands
  const hairBands = await prisma.category.create({
    data: {
      name: createMultilingual('Bandanas & Serre-têtes', 'Hair Bands', 'عقالات الشعر'),
      slug: createMultilingualSlug('Bandanas & Serre-têtes', 'Hair Bands', 'عقالات الشعر'),
      description: createMultilingual(
        'Bandanas et serre-têtes pour cheveux',
        'Hair bands and headbands',
        'عقالات ورباطات الشعر'
      ),
      parentId: hairAccessories.id,
      sortOrder: 2,
    },
  });

  // Hair Accessories > Hair Ties
  const hairTies = await prisma.category.create({
    data: {
      name: createMultilingual('Élastiques Cheveux', 'Hair Ties', 'أربطة الشعر'),
      slug: createMultilingualSlug('Élastiques Cheveux', 'Hair Ties', 'أربطة الشعر'),
      description: createMultilingual(
        'Élastiques et attaches pour cheveux',
        'Hair ties and hair accessories',
        'أربطة وإكسسوارات الشعر'
      ),
      parentId: hairAccessories.id,
      sortOrder: 3,
    },
  });

  // Jewelry > Necklaces
  const necklaces = await prisma.category.create({
    data: {
      name: createMultilingual('Colliers', 'Necklaces', 'القلائد'),
      slug: createMultilingualSlug('Colliers', 'Necklaces', 'القلائد'),
      description: createMultilingual(
        'Colliers et pendentifs',
        'Necklaces and pendants',
        'القلائد والمعلقات'
      ),
      parentId: jewelry.id,
      sortOrder: 1,
    },
  });

  // Jewelry > Earrings
  const earrings = await prisma.category.create({
    data: {
      name: createMultilingual('Boucles d\'oreilles', 'Earrings', 'الأقراط'),
      slug: createMultilingualSlug('Boucles d\'oreilles', 'Earrings', 'الأقراط'),
      description: createMultilingual(
        'Boucles d\'oreilles et créoles',
        'Earrings and ear studs',
        'الأقراط والخرص'
      ),
      parentId: jewelry.id,
      sortOrder: 2,
    },
  });

  // Cosmetics > Makeup
  const makeup = await prisma.category.create({
    data: {
      name: createMultilingual('Maquillage', 'Makeup', 'المكياج'),
      slug: createMultilingualSlug('Maquillage', 'Makeup', 'المكياج'),
      description: createMultilingual(
        'Produits de maquillage',
        'Makeup products',
        'منتجات المكياج'
      ),
      parentId: cosmetics.id,
      sortOrder: 1,
    },
  });

  // Cosmetics > Skincare
  const skincare = await prisma.category.create({
    data: {
      name: createMultilingual('Soins Visage', 'Skincare', 'العناية بالبشرة'),
      slug: createMultilingualSlug('Soins Visage', 'Skincare', 'العناية بالبشرة'),
      description: createMultilingual(
        'Produits de soin pour le visage',
        'Facial skincare products',
        'منتجات العناية بالوجه'
      ),
      parentId: cosmetics.id,
      sortOrder: 2,
    },
  });

  // Kitchen > Cookware
  const cookware = await prisma.category.create({
    data: {
      name: createMultilingual('Ustensiles Cuisine', 'Cookware', 'أدوات الطبخ'),
      slug: createMultilingualSlug('Ustensiles Cuisine', 'Cookware', 'أدوات الطبخ'),
      description: createMultilingual(
        'Ustensiles et casseroles de cuisine',
        'Kitchen utensils and cookware',
        'أدوات وأواني المطبخ'
      ),
      parentId: kitchen.id,
      sortOrder: 1,
    },
  });

  // Kitchen > Tableware
  const tableware = await prisma.category.create({
    data: {
      name: createMultilingual('Vaisselle', 'Tableware', 'أدوات المائدة'),
      slug: createMultilingualSlug('Vaisselle', 'Tableware', 'أدوات المائدة'),
      description: createMultilingual(
        'Assiettes, verres et couverts',
        'Plates, glasses and cutlery',
        'أطباق وكؤوس وأدوات المائدة'
      ),
      parentId: kitchen.id,
      sortOrder: 2,
    },
  });

  // Decoration > Wall Art
  const wallArt = await prisma.category.create({
    data: {
      name: createMultilingual('Art Mural', 'Wall Art', 'فن الحائط'),
      slug: createMultilingualSlug('Art Mural', 'Wall Art', 'فن الحائط'),
      description: createMultilingual(
        'Tableaux et décorations murales',
        'Paintings and wall decorations',
        'اللوحات والديكورات الجدارية'
      ),
      parentId: decoration.id,
      sortOrder: 1,
    },
  });

  // Decoration > Lighting
  const lighting = await prisma.category.create({
    data: {
      name: createMultilingual('Éclairage', 'Lighting', 'الإضاءة'),
      slug: createMultilingualSlug('Éclairage', 'Lighting', 'الإضاءة'),
      description: createMultilingual(
        'Lampes et éclairages d\'intérieur',
        'Lamps and interior lighting',
        'المصابيح والإضاءة الداخلية'
      ),
      parentId: decoration.id,
      sortOrder: 2,
    },
  });

  // Fitness > Weights
  const weights = await prisma.category.create({
    data: {
      name: createMultilingual('Poids & Haltères', 'Weights', 'الأوزان والأثقال'),
      slug: createMultilingualSlug('Poids & Haltères', 'Weights', 'الأوزان والأثقال'),
      description: createMultilingual(
        'Poids libres et haltères',
        'Free weights and dumbbells',
        'الأوزان الحرة والأثقال'
      ),
      parentId: fitness.id,
      sortOrder: 1,
    },
  });

  // Fitness > Yoga
  const yoga = await prisma.category.create({
    data: {
      name: createMultilingual('Yoga', 'Yoga', 'اليوجا'),
      slug: createMultilingualSlug('Yoga', 'Yoga', 'اليوجا'),
      description: createMultilingual(
        'Équipements et accessoires de yoga',
        'Yoga equipment and accessories',
        'معدات وإكسسوارات اليوجا'
      ),
      parentId: fitness.id,
      sortOrder: 2,
    },
  });

  // Outdoor Activities > Camping
  const camping = await prisma.category.create({
    data: {
      name: createMultilingual('Camping', 'Camping', 'التخييم'),
      slug: createMultilingualSlug('Camping', 'Camping', 'التخييم'),
      description: createMultilingual(
        'Équipements de camping',
        'Camping equipment',
        'معدات التخييم'
      ),
      parentId: outdoorActivities.id,
      sortOrder: 1,
    },
  });

  // Outdoor Activities > Hiking
  const hiking = await prisma.category.create({
    data: {
      name: createMultilingual('Randonnée', 'Hiking', 'المشي لمسافات طويلة'),
      slug: createMultilingualSlug('Randonnée', 'Hiking', 'المشي لمسافات طويلة'),
      description: createMultilingual(
        'Équipements de randonnée',
        'Hiking equipment',
        'معدات المشي لمسافات طويلة'
      ),
      parentId: outdoorActivities.id,
      sortOrder: 2,
    },
  });

  console.log('Level 3 categories created');
  console.log('Category tree created successfully!');
  console.log('\nCategory structure:');
  console.log('├── Electronics');
  console.log('│   ├── Computer Accessories');
  console.log('│   │   ├── Mouse ✓');
  console.log('│   │   ├── Keyboards');
  console.log('│   │   └── Webcams');
  console.log('│   ├── Mobile & Tablets');
  console.log('│   └── Audio & Video');
  console.log('├── Fashion & Beauty');
  console.log('│   ├── Hair Accessories');
  console.log('│   │   ├── Hair Clips ✓');
  console.log('│   │   ├── Hair Bands');
  console.log('│   │   └── Hair Ties');
  console.log('│   ├── Jewelry');
  console.log('│   │   ├── Necklaces');
  console.log('│   │   └── Earrings');
  console.log('│   └── Cosmetics');
  console.log('│       ├── Makeup');
  console.log('│       └── Skincare');
  console.log('├── Home & Living');
  console.log('│   ├── Kitchen');
  console.log('│   │   ├── Cookware');
  console.log('│   │   └── Tableware');
  console.log('│   └── Decoration');
  console.log('│       ├── Wall Art');
  console.log('│       └── Lighting');
  console.log('└── Sports & Outdoors');
  console.log('    ├── Fitness');
  console.log('    │   ├── Weights');
  console.log('    │   └── Yoga');
  console.log('    └── Outdoor Activities');
  console.log('        ├── Camping');
  console.log('        └── Hiking');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
