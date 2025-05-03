
// Mock Properties Data
export const properties = [
  {
    id: 1,
    name: "The Ritz-Carlton",
    type: "Hotel",
    location: {
      city: "New York",
      country: "USA",
      distance: "0.5 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 9.2,
    reviews: 1245,
    price: 299,
    currency: "$",
    perNight: true,
    freeCancellation: true,
    verified: true,
    arEnabled: true,
    description: "Experience luxury in the heart of New York City. The Ritz-Carlton features elegantly appointed guest rooms and suites, fine dining, a world-class spa, and personalized service.",
    amenities: ["Free WiFi", "Swimming Pool", "Fitness Center", "Spa", "Restaurant", "Bar", "Room Service", "Parking", "Air Conditioning"],
    rooms: [
      { id: 1, name: "Deluxe Room", price: 299, currency: "$", capacity: "2 adults", beds: "1 king bed" },
      { id: 2, name: "Premier Suite", price: 499, currency: "$", capacity: "2 adults, 2 children", beds: "1 king bed, 1 sofa bed" },
      { id: 3, name: "Executive Suite", price: 699, currency: "$", capacity: "4 adults", beds: "2 king beds" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  },
  {
    id: 2,
    name: "Central Park Apartments",
    type: "Apartment",
    location: {
      city: "New York",
      country: "USA",
      distance: "0.8 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 8.9,
    reviews: 823,
    price: 189,
    currency: "$",
    perNight: true,
    freeCancellation: true,
    verified: true,
    arEnabled: false,
    description: "Modern apartments overlooking Central Park. Each unit features a fully equipped kitchen, living area, and stunning park views. Walking distance to major attractions.",
    amenities: ["Free WiFi", "Kitchen", "Washer & Dryer", "Air Conditioning", "TV", "Elevator", "Heating"],
    rooms: [
      { id: 1, name: "Studio Apartment", price: 189, currency: "$", capacity: "2 adults", beds: "1 queen bed" },
      { id: 2, name: "1-Bedroom Apartment", price: 259, currency: "$", capacity: "3 adults", beds: "1 king bed, 1 sofa bed" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  },
  {
    id: 3,
    name: "Boutique SoHo Hotel",
    type: "Boutique Hotel",
    location: {
      city: "New York",
      country: "USA",
      distance: "1.2 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 9.1,
    reviews: 567,
    price: 249,
    currency: "$",
    perNight: true,
    freeCancellation: false,
    verified: false,
    arEnabled: true,
    description: "A chic boutique hotel in the heart of SoHo. Featuring artistically designed rooms, a rooftop terrace, and an award-winning restaurant.",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Room Service", "Air Conditioning", "Concierge", "Breakfast included"],
    rooms: [
      { id: 1, name: "Artist Room", price: 249, currency: "$", capacity: "2 adults", beds: "1 queen bed" },
      { id: 2, name: "Gallery Suite", price: 379, currency: "$", capacity: "2 adults", beds: "1 king bed" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  },
  {
    id: 4,
    name: "Midtown Modern Villa",
    type: "Villa",
    location: {
      city: "New York",
      country: "USA",
      distance: "1.5 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 9.8,
    reviews: 125,
    price: 599,
    currency: "$",
    perNight: true,
    freeCancellation: true,
    verified: true,
    arEnabled: true,
    description: "Luxurious modern villa in Midtown Manhattan. Features a private garden, five bedrooms, a gourmet kitchen, and an indoor pool. Perfect for families or groups.",
    amenities: ["Free WiFi", "Swimming Pool", "Kitchen", "Garden", "Washer & Dryer", "Air Conditioning", "Parking", "TV", "BBQ"],
    rooms: [
      { id: 1, name: "Master Bedroom", price: 599, currency: "$", capacity: "2 adults", beds: "1 king bed" },
      { id: 2, name: "Family Suite", price: 599, currency: "$", capacity: "4 adults", beds: "2 queen beds" },
      { id: 3, name: "Guest Room", price: 599, currency: "$", capacity: "2 adults", beds: "1 queen bed" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  },
  {
    id: 5,
    name: "Downtown Loft",
    type: "Loft",
    location: {
      city: "New York",
      country: "USA",
      distance: "0.9 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 8.7,
    reviews: 320,
    price: 179,
    currency: "$",
    perNight: true,
    freeCancellation: true,
    verified: false,
    arEnabled: false,
    description: "Industrial-chic loft in Downtown New York. Open concept design with high ceilings, exposed brick walls, and modern amenities. Walking distance to subway stations.",
    amenities: ["Free WiFi", "Kitchen", "Air Conditioning", "TV", "Washer & Dryer", "Heating"],
    rooms: [
      { id: 1, name: "Open Loft", price: 179, currency: "$", capacity: "4 adults", beds: "1 king bed, 1 sofa bed" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  },
  {
    id: 6,
    name: "Broadway Budget Inn",
    type: "Hostel",
    location: {
      city: "New York",
      country: "USA",
      distance: "0.4 miles"
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    rating: 7.5,
    reviews: 910,
    price: 49,
    currency: "$",
    perNight: true,
    freeCancellation: true,
    verified: false,
    arEnabled: false,
    description: "Affordable accommodation near Broadway. Clean, comfortable rooms with basic amenities. Free breakfast and communal kitchen.",
    amenities: ["Free WiFi", "Free Breakfast", "Kitchen", "Lockers", "Air Conditioning", "Common Room"],
    rooms: [
      { id: 1, name: "Dormitory Bed", price: 49, currency: "$", capacity: "1 adult", beds: "1 single bed" },
      { id: 2, name: "Private Room", price: 89, currency: "$", capacity: "2 adults", beds: "2 single beds" }
    ],
    weather: {
      forecast: [
        { day: "Monday", temp: "75°F", icon: "sun" },
        { day: "Tuesday", temp: "77°F", icon: "sun" },
        { day: "Wednesday", temp: "72°F", icon: "cloud-sun" },
        { day: "Thursday", temp: "68°F", icon: "cloud" },
        { day: "Friday", temp: "65°F", icon: "cloud-rain" },
        { day: "Saturday", temp: "69°F", icon: "cloud-sun" },
        { day: "Sunday", temp: "72°F", icon: "sun" }
      ]
    }
  }
];

// Mock Local Guides Data
export const localGuides = [
  {
    id: 1,
    title: "Hidden Gems in New York",
    author: "Jane Smith",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    location: "New York, USA",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    intro: "Discover the lesser-known treasures of New York that most tourists miss.",
    highlights: ["Secret gardens in Manhattan", "Underground art galleries", "Best local bakeries", "Historic architecture walks"],
    upvotes: 342
  },
  {
    id: 2,
    title: "London Like a Local",
    author: "Mark Johnson",
    profileImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    location: "London, UK",
    date: "April 23, 2023",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    intro: "Experience London beyond the tourist attractions with this local's guide.",
    highlights: ["Best pubs in East London", "Hidden parks and gardens", "Local markets", "Authentic British food spots"],
    upvotes: 286
  },
  {
    id: 3,
    title: "Paris Food Journey",
    author: "Sophie Dubois",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    location: "Paris, France",
    date: "June 8, 2023",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    intro: "A culinary tour through the best eateries in Paris, from bakeries to fine dining.",
    highlights: ["Best croissants in Paris", "Hidden bistros", "Wine tasting spots", "Authentic French cuisine"],
    upvotes: 412
  },
  {
    id: 4,
    title: "Tokyo After Dark",
    author: "Hiro Tanaka",
    profileImage: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
    location: "Tokyo, Japan",
    date: "May 30, 2023",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    intro: "Explore Tokyo's vibrant nightlife scene, from karaoke bars to izakayas.",
    highlights: ["Best karaoke spots", "Hidden izakayas", "Night street food", "24-hour entertainment"],
    upvotes: 356
  }
];

// Mock Travel Journal Entries
export const journalEntries = [
  {
    id: 1,
    title: "Summer in New York",
    location: "New York, USA",
    date: "July 10-17, 2023",
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    content: "My week in New York was amazing! Started with a visit to Central Park, followed by exploring the MET and eating the best pizza in Brooklyn...",
    highlights: ["Central Park", "MET Museum", "Brooklyn Bridge", "Broadway show"],
    accommodation: "The Ritz-Carlton, New York"
  },
  {
    id: 2,
    title: "Weekend in Paris",
    location: "Paris, France",
    date: "June 3-5, 2023",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1540162012087-61f9ebbaef5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    content: "A short but sweet weekend in Paris. Visited the Eiffel Tower, strolled along the Seine, and enjoyed fantastic pastries at local cafés...",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River", "Bakeries"],
    accommodation: "Hotel du Louvre, Paris"
  }
];

// Mock Packing Lists
export const packingListTemplates = {
  beach: [
    "Swimsuits", "Beach towels", "Sunscreen", "Sunglasses", "Hat", "Flip-flops", "Cover-ups", "Beach bag",
    "Waterproof phone case", "Books/e-reader", "Insect repellent", "After-sun lotion", "Light clothing"
  ],
  city: [
    "Comfortable walking shoes", "City map/guide", "Day bag/backpack", "Camera", "Power bank", "Water bottle",
    "Light jacket", "Umbrella", "Versatile clothing", "Secure wallet/purse", "Travel adapter"
  ],
  mountain: [
    "Hiking boots", "Hiking socks", "Layered clothing", "Waterproof jacket", "Backpack", "Water bottle",
    "Trail snacks", "First aid kit", "Sunscreen", "Insect repellent", "Map/compass", "Hiking poles"
  ],
  winter: [
    "Warm coat", "Thermal underwear", "Sweaters", "Gloves", "Scarf", "Hat", "Waterproof boots",
    "Thick socks", "Lip balm", "Moisturizer", "Hand warmers", "Sunglasses"
  ],
  business: [
    "Business attire", "Laptop/tablet", "Chargers", "Business cards", "Notebook/pen", "Portfolio/documents",
    "Presentation materials", "Travel-size toiletries", "Comfortable dress shoes"
  ]
};
