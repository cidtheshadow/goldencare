/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Community } from '../types';

export const communitiesData: Community[] = [
  {
    id: "com-1",
    name: "The Gardens at Golden Hills",
    careTypes: ["Assisted Living", "Independent Living"],
    address: "1420 Pinecrest Boulevard",
    city: "San Francisco",
    rating: 4.9,
    reviewsCount: 124,
    startingPrice: 4200,
    description: "Nestled in the rolling hills of the Bay Area, The Gardens provides an exquisite blend of independence and supportive care. Our vibrant community boasts manicured gardens, chef-prepared organic meals, and an active lifestyle calendar tailored to each resident's passions.",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Chef-Prepared Dining",
      "Heated Therapy Pool",
      "Fitness & Yoga Studio",
      "On-site Salon & Spa",
      "Lush Private Gardens",
      "Library & Computer Lab"
    ],
    features: [
      "24/7 Wellness Staff",
      "Emergency Response System",
      "Medication Management",
      "Scheduled Transportation",
      "Housekeeping & Laundry"
    ],
    phone: "(415) 555-0192"
  },
  {
    id: "com-2",
    name: "Silver Birch Sanctuary",
    careTypes: ["Memory Care"],
    address: "880 Birchwood Avenue",
    city: "San Jose",
    rating: 4.8,
    reviewsCount: 96,
    startingPrice: 5100,
    description: "Silver Birch is a state-of-the-art memory care community utilizing positive-approach therapies for residents with Alzheimer's and other forms of dementia. Our secure, home-like environment features circular walking paths, sensory gardens, and highly specialized care companions.",
    imageUrl: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Sensory Multi-media Room",
      "Secure Circular Gardens",
      "Family Bistro & Café",
      "Art & Music Therapy Room",
      "Cozy Common Fireplaces"
    ],
    features: [
      "Dementia-Certified Nursing",
      "Individualized Life Story Plans",
      "High Staff-to-Resident Ratio",
      "Secure Keypad Entry & Exit",
      "Daily Cognitive Exercises"
    ],
    phone: "(408) 555-0143"
  },
  {
    id: "com-3",
    name: "Oakridge Independent Manor",
    careTypes: ["Independent Living"],
    address: "3300 Oakridge Drive",
    city: "Oakland",
    rating: 4.7,
    reviewsCount: 82,
    startingPrice: 3500,
    description: "Designed for active seniors seeking a care-free lifestyle, Oakridge offers spacious independent cottage apartments, gourmet dining, and absolute freedom from home maintenance. Keep your mind and body active in a neighborhood-style campus filled with warmth.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Private Golf Putting Green",
      "Billiards & Game Room",
      "Woodworking Workshop",
      "Private Patio Cottages",
      "Bar & Social Lounge",
      "Cocktail Hours"
    ],
    features: [
      "Concierge Services",
      "Continental Breakfast",
      "Weekly Housekeeping",
      "Social Activity Director",
      "Pet-Friendly Campus"
    ],
    phone: "(510) 555-0178"
  },
  {
    id: "com-4",
    name: "Whispering Pines Assisted Living",
    careTypes: ["Assisted Living", "Memory Care"],
    address: "515 Whispering Pines Lane",
    city: "San Mateo",
    rating: 4.9,
    reviewsCount: 110,
    startingPrice: 4600,
    description: "Whispering Pines is a warm, family-centered community nestled in redwood-sheltered groves. We focus on enhancing daily life with respectful, personalized assistance in activities of daily living, medication schedules, and nutrition in a serene, nature-focused environment.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Veranda overlooking Redwoods",
      "Walking Forest Trails",
      "Cooking Demonstration Kitchen",
      "On-site Chapel & Chaplain",
      "Wellness Clinic Room"
    ],
    features: [
      "Licensed On-Site Nurses",
      "Physical & Occupational Therapy",
      "Incontinence Support Programs",
      "Diabetes Care Management",
      "Personal Care Escorts"
    ],
    phone: "(650) 555-0155"
  },
  {
    id: "com-5",
    name: "Serenity Bay Senior Living",
    careTypes: ["Assisted Living", "Independent Living", "Memory Care"],
    address: "2400 Shoreline Drive",
    city: "San Francisco",
    rating: 5.0,
    reviewsCount: 148,
    startingPrice: 4800,
    description: "Overlooking the beautiful San Francisco Bay, Serenity Bay offers an all-inclusive continuum of care. Residents can transition seamlessly between fully independent living, personalized assisted care, and specialized secure memory wings without moving from our master-planned coastal retreat.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Waterfront Dining Room",
      "Movie Theater with Recliners",
      "Greenhouse & Planting Beds",
      "Guest Suites for Families",
      "Rooftop Ocean View Deck"
    ],
    features: [
      "Age-in-Place Continuum Policy",
      "On-Site Medical Directors",
      "Daily Structured Activities",
      "Luxury Shuttle Services",
      "24-Hour Security Patrol"
    ],
    phone: "(415) 555-0111"
  },
  {
    id: "com-6",
    name: "Meadowbrook Memory Sanctuary",
    careTypes: ["Memory Care"],
    address: "712 Meadowbrook Drive",
    city: "Berkeley",
    rating: 4.8,
    reviewsCount: 74,
    startingPrice: 5300,
    description: "Meadowbrook focuses exclusively on advanced memory care in a tranquil neighborhood environment. We use highly engaging therapies including validation treatment, reminiscence sessions, and interactive digital cognitive games to ensure each resident experiences high levels of respect and warmth.",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    amenities: [
      "Interactive Sensory Walls",
      "Reminiscence Parlor Lounge",
      "Secure Shaded Courtyard",
      "Acoustic Sound Therapy Room",
      "Community Kitchen Counter"
    ],
    features: [
      "validation-trained caregivers",
      "Small-Group Guided Cooking",
      "GPS Location-Safety Devices",
      "Regular Family Support Groups",
      "Behavioral Therapy Specialists"
    ],
    phone: "(510) 555-0129"
  }
];
