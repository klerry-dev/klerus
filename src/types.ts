export type Page = 'home' | 'about' | 'projects' | 'shop' | 'chat';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}
