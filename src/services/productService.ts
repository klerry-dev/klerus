import { Product } from "../types";

class ProductService {
  private products: Product[] = [
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
  ];

  // Get all products
  getProducts(): Product[] {
    return this.products;
  }

  // Add a new product
  addProduct(productData: Omit<Product, "id">): Product {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Update an existing product
  updateProduct(id: string, productData: Omit<Product, "id">): Product | null {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = { ...productData, id };
    return this.products[index];
  }

  // Delete a product
  deleteProduct(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }

  // Get product by ID
  getProductById(id: string): Product | null {
    return this.products.find((p) => p.id === id) || null;
  }

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  // Get all unique categories
  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }

  // Search products
  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery),
    );
  }
}

// Export singleton instance
export const productService = new ProductService();
