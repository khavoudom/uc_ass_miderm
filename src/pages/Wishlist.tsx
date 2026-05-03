import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { products, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const favoriteProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold mb-8">Your Wishlist</h1>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-20 text-(--text-2)">
          <p className="mb-4">You haven't added any items to your wishlist yet.</p>
          <Link to="/shop" className="bg-(--accent) text-white border-none py-3 px-5 rounded-(--r-sm) font-semibold hover:bg-[#1D4ED8] transition-all inline-block">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {favoriteProducts.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} onClick={() => setSelectedProduct(p)} />
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
}
