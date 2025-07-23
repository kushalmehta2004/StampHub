const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const CatalogItem = require('../models/CatalogItem');
require('dotenv').config();

// Sample catalog items
const sampleCatalogItems = [
  {
    name: "Mahatma Gandhi 150th Birth Anniversary",
    description: "Commemorative stamp celebrating 150 years of Mahatma Gandhi's birth. Features a portrait of Gandhi with the spinning wheel (charkha) in the background.",
    category: "stamps",
    subcategory: "commemorative",
    theme: "personalities",
    postalCircle: "Delhi",
    releaseDate: new Date("2019-10-02"),
    price: 5,
    denomination: "₹5",
    images: [
      {
        url: "/images/gandhi-150.jpg",
        alt: "Mahatma Gandhi 150th Anniversary Stamp",
        isPrimary: true
      }
    ],
    specifications: {
      size: "40mm x 30mm",
      perforation: "13 x 13.5",
      printingProcess: "Offset",
      designer: "India Security Press",
      printer: "India Security Press, Nashik",
      paperType: "Unwatermarked",
      colors: ["Brown", "White", "Orange"]
    },
    stock: {
      quantity: 1000,
      reserved: 0,
      available: 1000
    },
    isActive: true,
    isFeatured: true,
    tags: ["Gandhi", "Independence", "Freedom Fighter", "Commemorative"]
  },
  {
    name: "Indian Railways Heritage - Steam Locomotives",
    description: "A beautiful set showcasing the heritage steam locomotives of Indian Railways, featuring the famous Fairy Queen and other historic engines.",
    category: "stamps",
    subcategory: "thematic",
    theme: "technology",
    postalCircle: "Maharashtra",
    releaseDate: new Date("2023-08-15"),
    price: 25,
    denomination: "₹5 x 5",
    images: [
      {
        url: "/images/railways-heritage.jpg",
        alt: "Indian Railways Heritage Stamps",
        isPrimary: true
      }
    ],
    specifications: {
      size: "40mm x 30mm each",
      perforation: "13.5 x 13",
      printingProcess: "Multicolor Offset",
      designer: "Railway Design Team",
      printer: "Security Printing Press, Hyderabad",
      paperType: "Watermarked",
      colors: ["Multiple"]
    },
    stock: {
      quantity: 500,
      reserved: 0,
      available: 500
    },
    isActive: true,
    isFeatured: true,
    tags: ["Railways", "Heritage", "Steam", "Transportation", "Set"]
  },
  {
    name: "Incredible India - Kerala Backwaters",
    description: "Stunning stamp featuring the serene backwaters of Kerala, showcasing India's natural beauty and tourism potential.",
    category: "stamps",
    subcategory: "tourism",
    theme: "nature",
    postalCircle: "Kerala",
    releaseDate: new Date("2023-12-01"),
    price: 10,
    denomination: "₹10",
    images: [
      {
        url: "/images/kerala-backwaters.jpg",
        alt: "Kerala Backwaters Stamp",
        isPrimary: true
      }
    ],
    specifications: {
      size: "50mm x 30mm",
      perforation: "13 x 13",
      printingProcess: "Photogravure",
      designer: "Kerala Tourism Board",
      printer: "India Security Press, Nashik",
      paperType: "Coated Paper",
      colors: ["Blue", "Green", "Brown"]
    },
    stock: {
      quantity: 750,
      reserved: 0,
      available: 750
    },
    isActive: true,
    isFeatured: false,
    tags: ["Kerala", "Tourism", "Backwaters", "Nature", "Incredible India"]
  },
  {
    name: "Diwali Festival of Lights",
    description: "Colorful stamp celebrating Diwali, the festival of lights, featuring traditional diyas and rangoli patterns.",
    category: "stamps",
    subcategory: "festival",
    theme: "festivals",
    postalCircle: "Uttar Pradesh",
    releaseDate: new Date("2023-11-12"),
    price: 8,
    denomination: "₹8",
    images: [
      {
        url: "/images/diwali-festival.jpg",
        alt: "Diwali Festival Stamp",
        isPrimary: true
      }
    ],
    specifications: {
      size: "40mm x 40mm",
      perforation: "13.5 x 13.5",
      printingProcess: "Multicolor Offset",
      designer: "Festival Design Team",
      printer: "Security Printing Press, Hyderabad",
      paperType: "Unwatermarked",
      colors: ["Gold", "Red", "Orange", "Yellow"]
    },
    stock: {
      quantity: 2000,
      reserved: 0,
      available: 2000
    },
    isActive: true,
    isFeatured: true,
    tags: ["Diwali", "Festival", "Lights", "Hindu", "Celebration"]
  },
  {
    name: "Red Fort First Day Cover",
    description: "Special first day cover featuring the iconic Red Fort in Delhi, with special cancellation mark.",
    category: "first-day-covers",
    subcategory: "monuments",
    theme: "monuments",
    postalCircle: "Delhi",
    releaseDate: new Date("2023-08-15"),
    price: 15,
    denomination: "FDC",
    images: [
      {
        url: "/images/red-fort-fdc.jpg",
        alt: "Red Fort First Day Cover",
        isPrimary: true
      }
    ],
    specifications: {
      size: "165mm x 110mm",
      printingProcess: "Offset Printing",
      designer: "Archaeological Survey of India",
      printer: "India Post",
      paperType: "Art Paper"
    },
    stock: {
      quantity: 300,
      reserved: 0,
      available: 300
    },
    isActive: true,
    isFeatured: false,
    tags: ["Red Fort", "FDC", "Monument", "Delhi", "Independence Day"]
  },
  {
    name: "Yoga International Day Miniature Sheet",
    description: "Beautiful miniature sheet commemorating International Day of Yoga, featuring various yoga poses and Indian philosophy.",
    category: "miniature-sheets",
    subcategory: "international",
    theme: "culture",
    postalCircle: "Haryana",
    releaseDate: new Date("2023-06-21"),
    price: 50,
    denomination: "₹10 x 4 + Label",
    images: [
      {
        url: "/images/yoga-miniature-sheet.jpg",
        alt: "Yoga International Day Miniature Sheet",
        isPrimary: true
      }
    ],
    specifications: {
      size: "120mm x 90mm",
      perforation: "13 x 13",
      printingProcess: "Multicolor Offset",
      designer: "Ministry of AYUSH",
      printer: "Security Printing Press, Hyderabad",
      paperType: "Watermarked"
    },
    stock: {
      quantity: 200,
      reserved: 0,
      available: 200
    },
    isActive: true,
    isFeatured: true,
    tags: ["Yoga", "International Day", "Miniature Sheet", "Health", "Philosophy"]
  },
  {
    name: "Indian Space Programme - Chandrayaan-3",
    description: "Commemorative stamp celebrating India's successful Chandrayaan-3 lunar mission, showcasing technological achievement.",
    category: "stamps",
    subcategory: "space",
    theme: "technology",
    postalCircle: "Karnataka",
    releaseDate: new Date("2023-09-15"),
    price: 12,
    denomination: "₹12",
    images: [
      {
        url: "/images/chandrayaan-3.jpg",
        alt: "Chandrayaan-3 Mission Stamp",
        isPrimary: true
      }
    ],
    specifications: {
      size: "40mm x 30mm",
      perforation: "13 x 13.5",
      printingProcess: "Multicolor Offset",
      designer: "ISRO Design Team",
      printer: "India Security Press, Nashik",
      paperType: "Coated Paper",
      colors: ["Blue", "Silver", "White", "Black"]
    },
    stock: {
      quantity: 1500,
      reserved: 0,
      available: 1500
    },
    isActive: true,
    isFeatured: true,
    tags: ["Chandrayaan", "Space", "ISRO", "Moon Mission", "Technology"]
  },
  {
    name: "Tribal Art of India - Warli Paintings",
    description: "Artistic stamp showcasing the traditional Warli paintings of Maharashtra, representing India's rich tribal heritage.",
    category: "stamps",
    subcategory: "art",
    theme: "art",
    postalCircle: "Maharashtra",
    releaseDate: new Date("2023-10-20"),
    price: 6,
    denomination: "₹6",
    images: [
      {
        url: "/images/warli-art.jpg",
        alt: "Warli Art Stamp",
        isPrimary: true
      }
    ],
    specifications: {
      size: "40mm x 30mm",
      perforation: "13.5 x 13",
      printingProcess: "Offset",
      designer: "Tribal Art Foundation",
      printer: "Security Printing Press, Hyderabad",
      paperType: "Textured Paper",
      colors: ["Brown", "White", "Ochre"]
    },
    stock: {
      quantity: 800,
      reserved: 0,
      available: 800
    },
    isActive: true,
    isFeatured: false,
    tags: ["Warli", "Tribal Art", "Maharashtra", "Heritage", "Folk Art"]
  }
];

// Sample admin user
const adminUser = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@nationalphilately.in",
  password: "admin123",
  phone: "9876543210",
  address: {
    street: "Department of Posts",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India"
  },
  role: "admin",
  isActive: true,
  emailVerified: true,
  depositAccount: {
    balance: 10000,
    transactions: [
      {
        type: "credit",
        amount: 10000,
        description: "Initial admin balance",
        timestamp: new Date()
      }
    ]
  }
};

// Sample regular user
const regularUser = {
  firstName: "John",
  lastName: "Collector",
  email: "john@example.com",
  password: "password123",
  phone: "9876543211",
  address: {
    street: "123 Collector Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  role: "user",
  isActive: true,
  emailVerified: true,
  depositAccount: {
    balance: 1000,
    transactions: [
      {
        type: "credit",
        amount: 1000,
        description: "Initial deposit",
        timestamp: new Date()
      }
    ]
  }
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/philately_platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await CatalogItem.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedAdminPassword = await bcrypt.hash(adminUser.password, 12);
    const admin = new User({
      ...adminUser,
      password: hashedAdminPassword
    });
    await admin.save();
    console.log('Created admin user');

    // Create regular user
    const hashedUserPassword = await bcrypt.hash(regularUser.password, 12);
    const user = new User({
      ...regularUser,
      password: hashedUserPassword
    });
    await user.save();
    console.log('Created regular user');

    // Create catalog items
    await CatalogItem.insertMany(sampleCatalogItems);
    console.log('Created catalog items');

    console.log('\n=== SEED DATA SUMMARY ===');
    console.log('Admin User:');
    console.log('  Email: admin@nationalphilately.in');
    console.log('  Password: admin123');
    console.log('\nRegular User:');
    console.log('  Email: john@example.com');
    console.log('  Password: password123');
    console.log(`\nCatalog Items: ${sampleCatalogItems.length} items created`);
    console.log('\n=== SEED COMPLETED SUCCESSFULLY ===');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleCatalogItems, adminUser, regularUser };