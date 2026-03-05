import { Product, Project } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    price: 89.99,
    image: "https://picsum.photos/seed/lamp/400/400",
    category: "Lighting",
  },
  {
    id: "2",
    name: "Ergonomic Chair",
    price: 299.0,
    image: "https://picsum.photos/seed/chair/400/400",
    category: "Furniture",
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    price: 150.0,
    image: "https://picsum.photos/seed/keyboard/400/400",
    category: "Tech",
  },
  {
    id: "4",
    name: "Studio Headphones",
    price: 199.99,
    image: "https://picsum.photos/seed/headphones/400/400",
    category: "Audio",
  },
  {
    id: "5",
    name: "Digital Planner",
    price: 0.0,
    image: "https://picsum.photos/seed/planner/400/400",
    category: "Free",
  },
  {
    id: "6",
    name: "Icon Pack",
    price: 0.0,
    image: "https://picsum.photos/seed/icons/400/400",
    category: "Free",
  },
  {
    id: "7",
    name: "UI Template",
    price: 0.0,
    image: "https://picsum.photos/seed/template/400/400",
    category: "Free",
  },
  {
    id: "8",
    name: "Ebook Guide",
    price: 0.0,
    image: "https://picsum.photos/seed/ebook/400/400",
    category: "Free",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Brand Identity",
    description: "A complete visual overhaul for a tech startup.",
    image: "https://picsum.photos/seed/brand/600/400",
    tags: ["Design", "Branding"],
  },
  {
    id: "2",
    title: "Mobile App",
    description: "A fitness tracking app with social features.",
    image: "https://picsum.photos/seed/app/600/400",
    tags: ["Development", "UI/UX"],
  },
  {
    id: "3",
    title: "Web Platform",
    description: "E-commerce platform for sustainable fashion.",
    image: "https://picsum.photos/seed/web/600/400",
    tags: ["Fullstack", "E-commerce"],
  },
];
