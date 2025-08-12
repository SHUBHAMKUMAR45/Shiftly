const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Property = require('./models/Property');
const User = require('./models/User');

// Sample data
const sampleProperties = [
  {
    title: 'Modern 3BHK Apartment',
    description: 'Beautiful modern apartment with all amenities in the heart of the city.',
    price: 4500000,
    location: 'Sector 62, Noida',
    city: 'Noida',
    category: 'Flat',
    propertyType: 'Buy',
    bhk: '3 BHK',
    area: 1200,
    amenities: 'Gym, Swimming Pool, Parking, Security, Power Backup',
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isVerified: true,
    isTrending: true,
    views: 245
  },
  {
    title: 'Luxury Villa',
    description: 'Spacious luxury villa with private garden and modern facilities.',
    price: 12000000,
    location: 'Golf Course Road, Gurgaon',
    city: 'Gurgaon',
    category: 'House',
    propertyType: 'Buy',
    bhk: '4 BHK',
    area: 2500,
    amenities: 'Private Garden, Gym, Swimming Pool, Parking, Security',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isVerified: true,
    isTrending: true,
    views: 189
  },
  {
    title: 'Cozy Studio Apartment',
    description: 'Perfect studio apartment for young professionals in central location.',
    price: 2500000,
    location: 'Connaught Place, Delhi',
    city: 'Delhi',
    category: 'Flat',
    propertyType: 'Buy',
    bhk: '1 BHK',
    area: 450,
    amenities: 'Parking, Security, Power Backup',
    images: [
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isVerified: false,
    isTrending: false,
    views: 78
  },
  {
    title: '2BHK Rent Apartment',
    description: 'Well-furnished 2BHK apartment available for rent with all modern amenities.',
    price: 25000,
    location: 'Sector 18, Noida',
    city: 'Noida',
    category: 'Flat',
    propertyType: 'Rent',
    bhk: '2 BHK',
    area: 900,
    amenities: 'Fully Furnished, Gym, Parking, Security',
    images: [
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isVerified: true,
    isTrending: false,
    views: 156
  },
  {
    title: 'Commercial Shop',
    description: 'Prime location commercial shop perfect for retail business.',
    price: 8500000,
    location: 'Khan Market, Delhi',
    city: 'Delhi',
    category: 'Shop',
    propertyType: 'Buy',
    area: 250,
    amenities: 'Prime Location, High Footfall, Parking',
    images: [
      'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    isVerified: true,
    isTrending: false,
    views: 92
  }
];

const sampleUser = {
  firstName: 'Demo',
  lastName: 'User',
  email: 'demo@shifly.com',
  phoneNumber: '+919999999999',
  password: 'demo123',
  age: '28',
  sex: 'M',
  role: 'both',
  isVerified: true
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://atulkur1999:dYNOTzzowofCHUrl@cluster0.u5h2mtj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Property.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Create demo user
    const hashedPassword = await bcrypt.hash(sampleUser.password, 12);
    const user = new User({
      ...sampleUser,
      password: hashedPassword
    });
    await user.save();

    console.log('Created demo user');

    // Create properties with demo user as owner
    const propertiesWithOwner = sampleProperties.map(property => ({
      ...property,
      owner: user._id
    }));

    await Property.insertMany(propertiesWithOwner);

    console.log('Seeded properties successfully');
    console.log('Demo credentials:');
    console.log('Email: demo@shifly.com');
    console.log('Password: demo123');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
}

seedDatabase();