export const PRODUCTS = [
  {
    id: "p1",
    name: "Mango Achar",
    category: "Pickles",
    weight: "250g",
    price: 99,
    wholesalePricePerKg: 340,
    description: "Traditional raw mango pieces pickled with mustard oil, fenugreek, and hand-ground spices.",
    popular: true,
    badge: "Bestseller",
    imageType: "pickle"
  },
  {
    id: "p2",
    name: "Vegetable Achar",
    category: "Pickles",
    weight: "250g",
    price: 99,
    wholesalePricePerKg: 340,
    description: "A delightful assortment of carrots, cauliflower, and green chillies in rich aromatic spices.",
    popular: false,
    badge: "Traditional",
    imageType: "pickle"
  },
  {
    id: "p3",
    name: "Lemon Achar",
    category: "Pickles",
    weight: "250g",
    price: 99,
    wholesalePricePerKg: 340,
    description: "Juicy sun-ripened lemons cured to perfection with black salt and roasted cumin.",
    popular: false,
    badge: "Tangy",
    imageType: "pickle"
  },
  {
    id: "p4",
    name: "Tomato Achar",
    category: "Pickles",
    weight: "250g",
    price: 99,
    wholesalePricePerKg: 340,
    description: "Rich tangy tomatoes cooked down with garlic, tamarind, and chili powder.",
    popular: false,
    badge: "Special",
    imageType: "pickle"
  },
  {
    id: "p5",
    name: "Fruit Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Crispy oven-baked biscuits studded with tutti-frutti bits and buttery richness.",
    popular: true,
    badge: "Bakery Fresh",
    imageType: "biscuit"
  },
  {
    id: "p6",
    name: "Cashew Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Melt-in-the-mouth rich cookies generously loaded with roasted cashew nut pieces.",
    popular: true,
    badge: "Top Rated",
    imageType: "biscuit"
  },
  {
    id: "p7",
    name: "Osmania Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "The legendary sweet-and-salty buttery biscuit originating from the royal bakers of Hyderabad.",
    popular: true,
    badge: "Hyderabad Special",
    imageType: "biscuit"
  },
  {
    id: "p8",
    name: "Pista Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Delicate shortbread infused with cardamom and topped with crushed green pistachios.",
    popular: false,
    badge: "Royal",
    imageType: "biscuit"
  },
  {
    id: "p9",
    name: "Besan Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Traditional roasted gram flour cookies baked to golden perfection with pure ghee aroma.",
    popular: false,
    badge: "Classic",
    imageType: "biscuit"
  },
  {
    id: "p10",
    name: "Chocolate Cashew Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Rich cocoa-infused biscuits packed with crunchy roasted cashews for chocolate lovers.",
    popular: false,
    badge: "New Flavor",
    imageType: "biscuit"
  },
  {
    id: "p11",
    name: "Multiflour Ladoo Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Wholesome multigrain traditional biscuits blending nutrients with delicious crispiness.",
    popular: false,
    badge: "Healthy Choice",
    imageType: "biscuit"
  },
  {
    id: "p12",
    name: "Chai Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "The ultimate tea-time companion biscuit designed to absorb hot chai without breaking.",
    popular: true,
    badge: "Teatime Essential",
    imageType: "biscuit"
  },
  {
    id: "p13",
    name: "Badam Biscuit",
    category: "Biscuits",
    weight: "500g",
    price: 249,
    wholesalePricePerKg: 450,
    description: "Almond-rich buttery baked cookies topped with almond flakes and saffron essence.",
    popular: false,
    badge: "Premium",
    imageType: "biscuit"
  },
  {
    id: "p14",
    name: "Pure Ghee",
    category: "Ghee & Oils",
    weight: "250g",
    price: 199,
    wholesalePricePerKg: 760,
    description: "100% pure cultured cow ghee with golden granular texture and rich authentic aroma.",
    popular: true,
    badge: "100% Pure",
    imageType: "ghee"
  }
];

export const BUSINESS_INFO = {
  name: "Taher Ali Enterprises",
  tagline: "Premium Wholesale Food Products",
  description: "Supplying quality products across Hyderabad, Telangana.",
  owner: "Mohammed Abdullah Bilal",
  phone: "6305486808",
  whatsappNumber: "916305486808",
  location: "Hyderabad, Telangana",
  serviceArea: "All over Hyderabad & Telangana",
  businessHours: "Monday - Saturday: 8:00 AM - 8:00 PM (Sunday Open for Bulk Dispatch)",
  established: "1998"
};

export const BULK_TIERS = [
  { minUnits: 1, discountPercent: 0, label: "Retail / Small Pack" },
  { minUnits: 10, discountPercent: 5, label: "Bulk Tier 1 (10+ units: 5% off)" },
  { minUnits: 50, discountPercent: 12, label: "Wholesale Tier 2 (50+ units: 12% off)" },
  { minUnits: 200, discountPercent: 20, label: "Super Stockist Tier (200+ units: 20% off)" }
];
