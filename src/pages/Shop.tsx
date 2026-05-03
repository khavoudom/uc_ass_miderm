import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { X } from 'lucide-react';

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const isSale = searchParams.get('sale') === 'true';
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const clearSearch = () => {
    navigate('/shop');
  };

  let filteredProducts = products;

  if (query) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  }

  if (isSale) {
    filteredProducts = filteredProducts.filter(p => p.badge === 'sale');
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-4xl font-bold capitalize">
            {query ? `Search Results for "${query}"` : isSale ? 'Sale Items' : 'All Products'}
          </h1>
          {query && (
            <button 
              onClick={clearSearch}
              className="p-1.5 rounded-full bg-(--surface2) text-(--text-3) hover:text-(--red) transition-colors mt-2"
              title="Clear Search"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {query && <p className="text-(--text-2) mt-2">Found {filteredProducts.length} items</p>}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} onClick={() => setSelectedProduct(p)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-(--text-2)">
          <p>No products found matching your criteria.</p>
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
