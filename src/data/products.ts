export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  longDescription: string;
  materials: string[];
  features: string[];
  care: string[];
  fitNotes: string[];
  shippingReturn: string;
  sizes: string[];
  image: string;
  isFeatured?: boolean;
};

import imgBlackTshirt from "../assets/black-tshirt.png";
import imgClassicShorts from "../assets/classic-shorts.png";
import imgGreenDress from "../assets/green-dress.png";
import imgRedShoes from "../assets/redshoes.png";
import imgJeans from "../assets/jeans.png";
import imgDotShirt from "../assets/dotshirt.png";
import imgSleeves from "../assets/sleeves.png";
import imgBottoms from "../assets/bottoms.png";
import imgTops from "../assets/tops.png";

export const products: Product[] = [
  {
    id: "1",
    name: "Black T-Shirt",
    category: "Tops",
    price: 39.99,
    description: "Cool black shirt, must buy!",
    longDescription:
      "A soft-hand black tee built for daily wear, finished with a clean chest print and taped shoulders so it keeps its shape wash after wash.",
    materials: ["100% combed cotton", "Pre-shrunk for longevity"],
    features: [
      "Mid-weight jersey with a breathable feel",
      "Tagless neck for itch-free comfort",
      "Reinforced shoulder seams to prevent stretching",
    ],
    care: ["Machine wash cold, inside out", "Tumble dry low", "Do not bleach"],
    fitNotes: ["Classic fit that runs true to size", "Order one size up for an oversized look"],
    shippingReturn: "Free standard shipping and 30-day returns.",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: imgBlackTshirt,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Classic Shorts",
    category: "Bottoms",
    price: 39.99,
    description: "Comfortable and stylish shorts.",
    longDescription:
      "Classic Shorts built for warm days and weekend travel. A breathable cotton-nylon blend with a hint of stretch keeps you cool, while double-needle stitching and bar-tacked stress points add durability. A soft mesh pocketing reduces bulk and dries quickly after a beach dip.",
    materials: [
      "58% organic cotton for softness",
      "38% recycled nylon for strength",
      "4% elastane for easy stretch",
      "Pocketing: recycled mesh",
    ],
    features: [
      "4-pocket layout with hidden zip back pocket",
      "Gusseted crotch for unrestricted movement",
      "Moisture-wicking waistband that stays dry",
      "7\" inseam that hits above the knee",
    ],
    care: [
      "Machine wash cold with like colors",
      "Line dry for best longevity (tumble low if needed)",
      "Cool iron if desired; avoid harsh detergents",
    ],
    fitNotes: [
      "Athletic-tapered fit; sits at the waist",
      "If between sizes, size up for a relaxed drape",
      "Model is 6'0\" wearing size M",
    ],
    shippingReturn: "Free shipping over $50 and easy 30-day returns.",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: imgClassicShorts,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Green Dress",
    category: "Dresses",
    price: 89.99,
    description: "Elegant green dress for any occasion.",
    longDescription:
      "A drapey midi dress with a subtle sheen, gathered waist, and pockets you will actually use. Breathable fibers keep it light for daytime and layered nights.",
    materials: ["52% modal", "45% rayon", "3% elastane"],
    features: [
      "On-seam pockets",
      "Adjustable waist tie",
      "Lined bodice to prevent sheerness",
    ],
    care: ["Delicate cycle cold", "Lay flat to dry", "Steam to release wrinkles"],
    fitNotes: ["Relaxed top with a gently defined waist", "Hits mid-calf on most heights"],
    shippingReturn: "Free standard shipping and exchanges within 30 days.",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: imgGreenDress,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Red Shoes",
    category: "Shoes",
    price: 99.99,
    description: "Stylish red shoes with comfort.",
    longDescription:
      "Lightweight daily trainers with responsive cushioning and a breathable knit upper. A grippy rubber outsole keeps you steady on wet sidewalks.",
    materials: ["Engineered knit upper", "EVA midsole", "Rubber outsole"],
    features: ["Removable insole for custom orthotics", "Reflective heel hits for night runs"],
    care: ["Spot clean with mild soap", "Air dry", "Do not machine wash"],
    fitNotes: ["Fits true to size", "If between sizes, size up for thicker socks"],
    shippingReturn: "Free returns on unworn pairs within 30 days.",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
    image: imgRedShoes,
  },
  {
    id: "5",
    name: "Jeans",
    category: "Bottoms",
    price: 49.99,
    description: "Classic denim jeans.",
    longDescription:
      "Everyday denim with a slight taper, softened with an enzyme wash and built with 2% stretch so they break in quickly without bagging out.",
    materials: ["98% cotton", "2% elastane"],
    features: ["Reinforced pocket bags", "YKK zipper", "Chain-stitched hems"],
    care: ["Wash cold, inside out", "Line dry or tumble low", "Fade naturally; avoid bleach"],
    fitNotes: ["Sits at the waist with a slim-straight leg"],
    shippingReturn: "Free standard shipping; 30-day returns.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    image: imgJeans,
  },
  {
    id: "6",
    name: "Shirt",
    category: "Tops",
    price: 59.99,
    description: "Casual button-up shirt.",
    longDescription:
      "An easy button-up with a breathable weave and a soft hand-feel. Designed to be worn tucked or untucked with a slightly curved hem.",
    materials: ["60% cotton", "40% TENCEL lyocell"],
    features: ["Locker loop for quick hanging", "Pleated back yoke for mobility"],
    care: ["Machine wash cold", "Hang dry or tumble low", "Warm iron as needed"],
    fitNotes: ["Trim through the chest with room in the shoulders"],
    shippingReturn: "Free shipping on all shirts and 30-day returns.",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: imgDotShirt,
  },
  {
    id: "7",
    name: "Orange Jacket",
    category: "Outerwear",
    price: 59.99,
    description: "Vibrant orange lightweight jacket.",
    longDescription:
      "A striking orange jacket perfect for layering and adding color to any outfit. Crafted from a durable, water-resistant nylon with a soft fleece lining for warmth without bulk. Features raglan sleeves for enhanced mobility and a tapered waist for a flattering silhouette.",
    materials: ["100% ripstop nylon exterior", "Soft fleece lining", "Water-resistant coating"],
    features: [
      "Raglan sleeve design for better movement",
      "Two front zippered pockets",
      "Adjustable drawstring hem",
      "Tapered waist for a fitted look",
    ],
    care: ["Machine wash cold", "Tumble dry low", "Do not iron directly on fabric"],
    fitNotes: ["Slim fit with tapered waist", "Sits just above the hip", "Size up if layering with thick sweaters"],
    shippingReturn: "Free standard shipping and 30-day returns.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: imgSleeves,
  },
  {
    id: "8",
    name: "Black Pants",
    category: "Bottoms",
    price: 49.99,
    description: "Sleek black pants for any occasion.",
    longDescription:
      "Versatile black pants designed for both work and casual wear. These chinos feature a comfortable stretch blend that moves with you, a streamlined fit, and a clean aesthetic. Perfect for pairing with anything in your wardrobe.",
    materials: ["85% cotton", "12% polyester", "3% elastane"],
    features: [
      "Four-pocket layout with coin pocket",
      "Flat front for a sharp appearance",
      "Slim-straight leg fit",
      "Reinforced stitching at stress points",
    ],
    care: ["Machine wash cold with similar colors", "Tumble dry low", "Warm iron if needed"],
    fitNotes: ["Sits at the waist with a clean silhouette", "Inseam can be tailored", "Fits true to size"],
    shippingReturn: "Free standard shipping on orders over $50 and 30-day returns.",
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    image: imgBottoms,
  },
  {
    id: "9",
    name: "T-Shirt with Logo",
    category: "Tops",
    price: 39.99,
    description: "Classic tee with branded logo print.",
    longDescription:
      "A timeless t-shirt featuring a bold logo print on the front. Made from premium combed cotton, this tee offers exceptional comfort and durability. The relaxed fit makes it perfect for everyday wear, while the quality construction ensures it looks great wash after wash.",
    materials: ["100% premium combed cotton", "Pre-shrunk", "Ring-spun yarn"],
    features: [
      "Screen-printed logo on chest",
      "Tagless neck label for comfort",
      "Double-stitched hems for durability",
      "Comfortable relaxed fit",
    ],
    care: ["Machine wash cold with similar colors", "Tumble dry low", "Turn inside out to preserve logo"],
    fitNotes: ["Relaxed fit that runs true to size", "Comfortable length hits mid-hip", "Available in multiple sizes"],
    shippingReturn: "Free shipping on all tees and easy 30-day returns.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: imgTops,
  },
];

export const productById: Record<string, Product> = products.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, Product>
);
