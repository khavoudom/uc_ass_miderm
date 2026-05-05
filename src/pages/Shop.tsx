import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { X, SlidersHorizontal } from 'lucide-react';

const categories = ['All', 'Tech', 'Apparel', 'Books'];
const maxAvailablePrice = Math.max(...products.map(p => p.price));

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get('q')?.toLowerCase() || '';
  const isSale = searchParams.get('sale') === 'true';
  const categoryParam = searchParams.get('category') || 'All';
  const minPriceParam = parseInt(searchParams.get('min') || '0');
  const maxPriceParam = parseInt(searchParams.get('max') || maxAvailablePrice.toString());

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null || 
        value === 'All' || 
        (key === 'min' && value === '0') || 
        (key === 'max' && value === maxAvailablePrice.toString())
      ) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const queryString = params.toString();
    navigate(`/shop${queryString ? `?${queryString}` : ''}`);
  };

  const clearSearch = () => {
    navigate('/shop');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesQuery = !query || 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query);
      
      const matchesSale = !isSale || p.badge === 'sale';
      
      const matchesCategory = categoryParam === 'All' || p.category === categoryParam;
      
      const matchesPrice = p.price >= minPriceParam && p.price <= maxPriceParam;
      
      return matchesQuery && matchesSale && matchesCategory && matchesPrice;
    });
  }, [query, isSale, categoryParam, minPriceParam, maxPriceParam]);



  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="font-display text-4xl font-bold capitalize">
              {query ? `Search Results` : isSale ? 'Sale Items' : 'All Products'}
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
          {query && <p className="text-(--text-2) mt-1">Showing results for "{query}"</p>}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-(--r-sm) border transition-all ${showFilters ? 'bg-(--accent) text-white border-(--accent)' : 'bg-(--surface) text-(--text) border-(--border-strong) hover:bg-(--surface2)'}`}
          >
            <SlidersHorizontal size={18} />
            <span className="font-medium text-sm">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[400px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
        <div className="p-6 bg-(--surface) border border-(--border) rounded-(--r-lg) shadow-(--shadow-sm) grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Category Filter */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-(--text-2)">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilters({ category: cat })}
                  className={`px-4 py-1.5 rounded-(--r-full) text-sm font-medium transition-all ${categoryParam === cat ? 'bg-(--accent) text-white' : 'bg-(--surface2) text-(--text-2) hover:bg-(--border-strong)'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-(--text-2)">Price Range</h3>
              <span className="text-sm font-bold text-(--accent)">${minPriceParam} — ${maxPriceParam}</span>
            </div>
            <div className="px-2 pt-4 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-(--text-3) uppercase tracking-wider">Min Price</label>
                <input 
                  type="range" 
                  min="0" 
                  max={maxAvailablePrice} 
                  step="10"
                  value={minPriceParam}
                  onChange={(e) => updateFilters({ min: e.target.value })}
                  className="w-full h-1.5 bg-(--surface2) rounded-lg appearance-none cursor-pointer accent-(--accent)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-(--text-3) uppercase tracking-wider">Max Price</label>
                <input 
                  type="range" 
                  min="0" 
                  max={maxAvailablePrice} 
                  step="10"
                  value={maxPriceParam}
                  onChange={(e) => updateFilters({ max: e.target.value })}
                  className="w-full h-1.5 bg-(--surface2) rounded-lg appearance-none cursor-pointer accent-(--accent)"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-(--text-3) uppercase tracking-tighter pt-2">
                <span>$0</span>
                <span>${maxAvailablePrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <p className="text-sm text-(--text-2) mb-6">Found {filteredProducts.length} items</p>
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} onClick={() => setSelectedProduct(p)} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-(--surface) border border-dashed border-(--border-strong) rounded-(--r-lg)">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--surface2) text-(--text-3) mb-4">
            <X size={32} />
          </div>
          <p className="text-(--text-2) font-medium">No products found matching your criteria.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="mt-4 text-(--accent) font-bold text-sm hover:underline"
          >
            Clear all filters
          </button>
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
