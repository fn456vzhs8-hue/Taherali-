// Wholesale product catalog (text-only, no images).
// Descriptions and categories are auto-generated from the product name.

const RAW = [
  ["Kaju Pista Butter Biscuits", 255, "400g"],
  ["Milk Badam Biscuits", 235, "400g"],
  ["Premium Cashew Butterscotch Short Bread", 285, "300g"],
  ["Premium Almond Shortbread Biscuits", 275, "300g"],
  ["Premium Pistachio Shortbread Biscuits", 305, "300g"],
  ["Premium Butter Shortbread Biscuits", 230, "300g"],
  ["Gluten Free Chocochip Cookies", 230, "250g"],
  ["Gluten Free Mixed Nuts Cookies", 230, "250g"],
  ["Gluten Free Multi Nutrition Cookies", 230, "250g"],
  ["Gluten Free Chocochip Cookies", 130, "140g"],
  ["Gluten Free Mixed Nuts Cookies", 130, "140g"],
  ["Gluten Free Multi Nutrition Cookies", 130, "140g"],
  ["Dodha Barfi", 245, "200g"],
  ["Moong Dal Barfi", 240, "200g"],
  ["Mango Chocolate Barfi", 290, "200g"],
  ["Chana Barfi", 200, "200g"],
  ["Coconut Barfi", 185, "200g"],
  ["Chocolate Rose Barfi", 335, "200g"],
  ["Ajmeri Kalakan", 265, "200g"],
  ["Ajmeri Kalakan", 680, "500g"],
  ["Mango Kalakan", 265, "200g"],
  ["Mango Kalakan", 680, "500g"],
  ["Strawberry Milk Cake", 680, "500g"],
  ["Kaju Pan", 430, "150g"],
  ["Kaju Katli", 440, "200g"],
  ["Kaju Katli", 660, "300g"],
  ["Badam Katli", 705, "300g"],
  ["Badam Lotus", 565, "200g"],
  ["Kaju Pista Roll", 565, "200g"],
  ["Dry Fruit Sandwich", 565, "200g"],
  ["Boondi Laddu", 245, "200g"],
  ["Premium Fruit Biscuits", 220, "400g"],
  ["Premium Cashew Biscuits", 240, "400g"],
  ["Osmania Biscuits", 210, "400g"],
  ["Badam Pista Biscuits", 330, "400g"],
  ["Green Pista Biscuits", 250, "400g"],
  ["Choco Cashew Biscuits", 260, "400g"],
  ["Chai Biscuits", 200, "400g"],
  ["Jeera Biscuits", 200, "400g"],
  ["Fruit Biscuits", 110, "200g"],
  ["Cashew Biscuits", 120, "200g"],
  ["Osmania Biscuits", 105, "200g"],
  ["Badam Pista Biscuits", 170, "200g"],
  ["Green Pista Biscuits", 130, "200g"],
  ["Choco Cashew Biscuits", 130, "200g"],
  ["Chai Biscuits", 100, "200g"],
  ["Jeera Biscuits", 100, "200g"],
  ["Premium Fruit Biscuits", 430, "800g"],
  ["Premium Cashew Biscuits", 470, "800g"],
  ["Osmania Biscuits", 410, "800g"],
  ["Premium Fruit Biscuits - Tin Gift Box", 465, "400g"],
  ["Premium Cashew Biscuits - Tin Gift Box", 470, "400g"],
  ["Osmania Biscuits - Tin Gift Box", 445, "400g"],
  ["Badam Pista Biscuits - Tin Gift Box", 560, "400g"],
  ["Premium Fruit Biscuits - Individual Packed Box", 240, "400g"],
  ["Osmania Biscuits - Individual Packed Box", 230, "400g"],
  ["Regular Fruit Biscuits - New Box (Green)", 200, "400g"],
  ["Double Delight - Red (Fruit + Cashew)", 230, "400g"],
  ["Double Delight - Green (Cashew + Pista)", 250, "400g"],
  ["Double Delight - Gold (Fruit + Choco)", 240, "400g"],
  ["Double Delight - N. Gold (Cashew + Choc)", 250, "400g"],
  ["Double Delight - Pink (Fruit + Badam Pista)", 280, "400g"],
  ["Kaju & Badam Biscuits", 260, "400g"],
  ["Kaju & Badam Biscuits", 130, "200g"],
  ["Chand Biscuits", 260, "400g"],
  ["Chand Biscuits", 130, "200g"],
  ["Kesar Pista Biscuits", 250, "300g"],
  ["Dum Ke Rote", 400, "500g"],
  ["Sugar Free Choco Chunk Cookies", 250, "250g"],
  ["Sugar Free Almond Biscuits", 270, "250g"],
  ["Sugar Free Cashew Biscuits", 260, "250g"],
  ["Sugar Free Butter Cookies", 260, "250g"],
  ["Double Choco Chip Cookies", 250, "250g"],
  ["Chocolate Chip Cookies", 230, "250g"],
  ["Ragi Cookies", 240, "350g"],
  ["Atta Biscuits", 200, "300g"],
  ["Oat Meal Atta Biscuits", 200, "400g"],
  ["Fruit Nankathai", 200, "400g"],
  ["Almond Cake Rusk", 320, "400g"],
  ["Almond Cake Rusk", 160, "200g"],
  ["Fruit Cake Rusk", 270, "400g"],
  ["Fruit Cake Rusk", 140, "200g"],
  ["Premium Fruit Atta Biscuits", 240, "400g"],
  ["Vegan Premium Fruit Biscuits", 240, "400g"],
  ["Vegan Osmania Biscuits", 220, "400g"],
  ["Salt Biscuits", 160, "400g"],
  ["Coconut Cookies", 300, "400g"],
  ["Almond Millet Biscuits", 280, "300g"],
  ["Pistachio Millet Vegan", 350, "300g"],
  ["Blueberry Millet Vegan Biscuits", 300, "300g"],
  ["Sugar Free + Oats Biscuits", 260, "300g"],
  ["No Added Sugar - Almond Biscuits", 230, "300g"],
  ["Stevia Millet Pistachio Cookies", 360, "300g"],
  ["Rose Shortbread Biscuits", 240, "250g"],
  ["Shrewsbury Biscuits", 180, "250g"],
  ["Shrewsbury Biscuits", 280, "400g"],
  ["Butter Cookies", 220, "250g"],
  ["Chocolate Walnut Cookies", 280, "250g"],
  ["Oats & Honey Biscuits", 160, "250g"],
  ["Chocolava Biscuits", 150, "250g"],
  ["Chocolava Biscuits", 70, "90g"],
  ["Chocolava Hazelnut Cookies", 200, "250g"],
  ["Chocolava Hazelnut Cookies", 90, "75g"],
  ["Coconut Jaggery Biscuits", 350, "400g"],
  ["Coconut Jaggery Biscuits", 250, "250g"],
  ["Gur Jaggery Atta Biscuits", 290, "300g"],
];

export const WHOLESALE_CATEGORIES = [
  "Biscuits",
  "Cookies",
  "Sugar Free",
  "Vegan",
  "Gluten Free",
  "Rusks",
  "Sweets",
  "Gift Boxes",
  "Millet Products",
];

function categorize(name) {
  const n = name.toLowerCase();
  const cats = [];
  if (/gift box|tin|packed box|new box|double delight/.test(n)) cats.push("Gift Boxes");
  if (/sugar free|no added sugar|stevia/.test(n)) cats.push("Sugar Free");
  if (/\bvegan\b/.test(n)) cats.push("Vegan");
  if (/gluten free/.test(n)) cats.push("Gluten Free");
  if (/millet|ragi/.test(n)) cats.push("Millet Products");
  if (/rusk/.test(n)) cats.push("Rusks");
  if (/barfi|katli|kalakan|laddu|kaju roll|kaju pan|badam lotus|kaju pista roll|dry fruit sandwich|milk cake|dum ke rote/.test(n))
    cats.push("Sweets");
  if (/cookie/.test(n)) cats.push("Cookies");
  if (/biscuit|shortbread|nankathai|dum ke rote/.test(n)) cats.push("Biscuits");
  return cats.length ? Array.from(new Set(cats)) : ["Biscuits"];
}

function detectIngredients(n) {
  const map = [
    [/kaju|cashew/, "cashew"],
    [/badam|almond/, "almond"],
    [/pista|pistachio/, "pistachio"],
    [/choco|chocolate|chocolava/, "chocolate"],
    [/butterscotch/, "butterscotch"],
    [/butter/, "butter"],
    [/\bfruit\b/, "mixed fruit"],
    [/coconut/, "coconut"],
    [/jeera|cumin/, "cumin (jeera)"],
    [/milk|dairy/, "milk"],
    [/rose/, "rose essence"],
    [/hazelnut/, "hazelnut"],
    [/blueberry/, "blueberry"],
    [/honey/, "honey"],
    [/oats?|oat meal/, "oats"],
    [/mango/, "mango"],
    [/strawberry/, "strawberry"],
    [/chana|besan/, "gram flour"],
    [/moong dal/, "moong dal"],
    [/walnut/, "walnut"],
    [/dry fruit/, "mixed dry fruits"],
    [/kesar|saffron/, "saffron"],
    [/jaggery|gur/, "jaggery"],
    [/atta/, "whole wheat atta"],
    [/ragi/, "ragi (finger millet)"],
    [/millet/, "millet"],
    [/boondi/, "besan boondi"],
    [/salt/, "sea salt"],
  ];
  const found = [];
  map.forEach(([re, label]) => { if (re.test(n) && !found.includes(label)) found.push(label); });
  return found;
}

function describe(name) {
  const n = name.toLowerCase();
  const ings = detectIngredients(n);
  const ingText = ings.length ? ings.slice(0, 3).join(", ") : "quality bakery ingredients";

  const isBiscuit = /biscuit|shortbread|nankathai/.test(n);
  const isCookie = /cookie/.test(n);
  const isRusk = /rusk/.test(n);
  const isSweet = /barfi|katli|kalakan|laddu|kaju roll|kaju pan|badam lotus|kaju pista roll|dry fruit sandwich|milk cake|dum ke rote/.test(n);
  const isSugarFree = /sugar free|no added sugar|stevia/.test(n);
  const isVegan = /\bvegan\b/.test(n);
  const isGF = /gluten free/.test(n);
  const isMillet = /millet|ragi/.test(n);
  const isGift = /gift box|tin|packed box|new box|double delight/.test(n);

  let opener, closer;

  if (isGift) {
    opener = `Elegantly packed assortment featuring ${ingText}, presented in a giftable tin or box format ideal for festive and corporate occasions.`;
    closer = "Perfect for gifting, corporate hampers, festive retail displays, and premium wholesale supply.";
  } else if (isSweet) {
    opener = `Traditional Indian sweet crafted with ${ingText} using authentic time-honored recipes and slow-cooking techniques.`;
    closer = "Ideal for festive gifting, sweet shops, catering companies, and wholesale distribution.";
  } else if (isRusk) {
    opener = `Double-baked crunchy rusk with ${ingText}, delivering a golden crisp texture that pairs beautifully with tea and coffee.`;
    closer = "Perfect for cafés, bakeries, tea stalls, kirana stores, and retail shelves.";
  } else if (isSugarFree) {
    opener = `Sugar-free ${isCookie ? "cookies" : "biscuits"} crafted with ${ingText}, specially formulated for diabetic and fitness-conscious consumers without compromising on taste.`;
    closer = "Suitable for health-focused retail stores, pharmacies, gyms, and wellness chains.";
  } else if (isVegan) {
    opener = `Plant-based vegan ${isBiscuit ? "biscuits" : "product"} made with ${ingText}, free from dairy and animal-derived ingredients.`;
    closer = "Great for organic stores, vegan cafés, modern retail chains, and eco-conscious buyers.";
  } else if (isGF) {
    opener = `Gluten-free ${isCookie ? "cookies" : "biscuits"} baked with ${ingText}, crafted for gluten-intolerant and allergy-conscious consumers.`;
    closer = "Ideal for specialty health stores, pharmacies, and premium retail outlets.";
  } else if (isMillet) {
    opener = `Wholesome millet-based ${isCookie ? "cookies" : "biscuits"} blended with ${ingText}, offering a nutritious and fiber-rich snacking option.`;
    closer = "Perfect for wellness retailers, organic stores, and fitness-focused customer segments.";
  } else if (isCookie) {
    opener = `Crunchy buttery cookies baked with ${ingText}, delivering a rich indulgent snacking experience with every bite.`;
    closer = "Suitable for cafés, bakeries, supermarkets, and wholesale distribution.";
  } else {
    opener = `Premium Hyderabad-style ${isBiscuit ? "biscuits" : "product"} made with ${ingText}. Crisp texture with an authentic, rich flavor profile.`;
    closer = "Suitable for retail stores, supermarkets, cafés, and wholesale bulk orders.";
  }

  return `${opener} ${closer}`;
}

function parseWeight(w) {
  const m = String(w).match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

export const WHOLESALE_PRODUCTS = RAW.map(([name, mrp, weight], idx) => ({
  id: `w${idx + 1}`,
  name,
  mrp,
  weight,
  weightGrams: parseWeight(weight),
  categories: categorize(name),
  description: describe(name),
}));
