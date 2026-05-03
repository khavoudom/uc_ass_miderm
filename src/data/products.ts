export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  origPrice?: number;
  image: string;
  badge: 'sale' | 'new' | 'hot' | 'out' | null;
  rating: number;
};

export const products: Product[] = [
  // TECH & ELECTRONICS
  { id: 1, name: 'iPhone 15 Pro', category: 'Tech', price: 999, origPrice: 1099, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.9 },
  { id: 2, name: 'MacBook Pro M1 14"', category: 'Tech', price: 1299, origPrice: 1599, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.9 },
  { id: 3, name: 'iWatch Series 9', category: 'Tech', price: 399, origPrice: 449, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.8 },
  { id: 4, name: 'Wireless Headphones', category: 'Tech', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.7 },
  { id: 5, name: 'Mechanical Keyboard', category: 'Tech', price: 150, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.9 },
  { id: 6, name: 'Gaming Mouse', category: 'Tech', price: 79, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.6 },
  
  // APPAREL
  { id: 7, name: 'Classic White Shirt', category: 'Apparel', price: 45, origPrice: 60, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.5 },
  { id: 8, name: 'Premium Denim Jacket', category: 'Apparel', price: 85, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.7 },
  { id: 9, name: 'Minimalist Hoodie', category: 'Apparel', price: 65, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', badge: 'hot', rating: 4.8 },
  { id: 10, name: 'Leather Boots', category: 'Apparel', price: 180, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.6 },
  
  // BOOKS
  { id: 11, name: 'Design Patterns', category: 'Books', price: 40, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.9 },
  { id: 12, name: 'The Art of Cooking', category: 'Books', price: 35, origPrice: 50, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.7 },
  { id: 13, name: 'Travel Photography', category: 'Books', price: 55, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.8 },
  { id: 14, name: 'Modern Architecture', category: 'Books', price: 65, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400', badge: 'hot', rating: 4.9 },

  // MORE TECH
  { id: 15, name: 'MacBook Pro M2 14"', category: 'Tech', price: 1999, image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 5.0 },
  { id: 16, name: 'Smart Speaker', category: 'Tech', price: 120, origPrice: 150, image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.6 },
  { id: 17, name: 'Drone Camera', category: 'Tech', price: 799, image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&q=80&w=400', badge: 'hot', rating: 5.0 },
  { id: 18, name: 'Tablet Pro', category: 'Tech', price: 899, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.8 },
  
  // MORE APPAREL
  { id: 19, name: 'Canvas Backpack', category: 'Apparel', price: 55, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.4 },
  { id: 20, name: 'Sunglasses', category: 'Apparel', price: 120, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.7 },
  { id: 21, name: 'Leather Wallet', category: 'Apparel', price: 45, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400', badge: 'sale', rating: 4.6 },
  { id: 22, name: 'Wool Scarf', category: 'Apparel', price: 35, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=400', badge: null, rating: 4.5 },
  
  // MORE BOOKS
  { id: 23, name: 'Product Management', category: 'Books', price: 42, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', badge: 'new', rating: 4.8 },
  { id: 24, name: 'Mindset & Success', category: 'Books', price: 30, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400', badge: 'hot', rating: 4.9 }
];
