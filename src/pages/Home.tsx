import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products, type Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { SlidersHorizontal, X } from 'lucide-react';

const categories = ['All', 'Tech', 'Apparel', 'Books'];
const maxAvailablePrice = Math.max(...products.map(p => p.price));

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxAvailablePrice);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, minPrice, maxPrice]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-[55%] space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-(--accent-light) text-(--accent) text-xs font-semibold py-1.5 px-3 rounded-(--r-full)">✨ New Collection</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
            Elevate your lifestyle with <span className="text-(--accent)">Lumina.</span>
          </h1>
          <p className="text-(--text-2) text-lg max-w-md">
            Discover the latest in premium tech, apparel, and curated books. Quality craftsmanship for the modern individual.
          </p>
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => navigate('/shop')}
              className="bg-(--accent) text-white border-none py-3 px-5 rounded-(--r-sm) font-semibold transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#1D4ED8] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
            >
              Shop Now
            </button>
            <button 
              onClick={() => navigate('/shop')}
              className="bg-(--surface) text-(--text) border border-(--border-strong) py-3 px-5 rounded-(--r-sm) hover:bg-(--surface2) hover:-translate-y-px transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              Explore Styles
            </button>
          </div>
          <div className="flex gap-6 pt-8 text-sm font-medium text-(--text-2)">
            <div className="flex flex-col">
              <span className="text-(--text) font-bold text-lg">12k+</span>
              customers
            </div>
            <div className="flex flex-col">
              <span className="text-(--text) font-bold text-lg">4.9 ★</span>
              rating
            </div>
            <div className="flex flex-col">
              <span className="text-(--text) font-bold text-lg">48h</span>
              delivery
            </div>
          </div>
        </div>
        <div className="md:w-[45%] w-full rounded-(--r-lg) overflow-hidden shadow-(--shadow-lg) border border-(--border) relative aspect-[4/5]">
          <img 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800" 
            alt="MacBook Pro M2" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-(--surface)/90 backdrop-blur p-4 rounded-(--r) flex justify-between items-center text-(--text)">
            <div>
              <div className="font-bold">MacBook Pro M2 14"</div>
              <div className="text-sm text-(--text-2)">The power of Pro</div>
            </div>
            <button 
              onClick={() => setSelectedProduct(products.find(p => p.id === 15) || null)}
              className="bg-(--accent) text-white border-none py-2 px-4 rounded-(--r-sm) font-semibold text-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#1D4ED8] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
            >
              View
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display text-3xl font-bold">Trending Now</h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-(--r-sm) border transition-all ${showFilters ? 'bg-(--accent) text-white border-(--accent)' : 'bg-(--surface) text-(--text) border-(--border-strong) hover:bg-(--surface2)'}`}
          >
            <SlidersHorizontal size={18} />
            <span className="font-medium text-sm">Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-[400px] mb-12 opacity-100' : 'max-h-0 mb-0 opacity-0'}`}>
          <div className="p-6 bg-(--surface) border border-(--border) rounded-(--r-lg) shadow-(--shadow-sm) grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price Filter */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-(--text-2)">Price Range</h3>
                <span className="text-sm font-bold text-(--accent)">${minPrice} — ${maxPrice}</span>
              </div>
              <div className="px-2 pt-4 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-(--text-3) uppercase tracking-wider">Min Price</label>
                  <input 
                    type="range" 
                    min="0" 
                    max={maxAvailablePrice} 
                    step="10"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
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
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
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
        
        <div className="flex gap-2 overflow-x-auto px-5 pb-7 -mx-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`py-2 px-4 rounded-(--r-full) border bg-(--surface) text-[13px] font-medium whitespace-nowrap cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeCategory === cat ? 'bg-(--accent)! text-white! border-(--accent)' : 'border-(--border) text-(--text-2)'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4" key={activeCategory}>
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} onClick={() => setSelectedProduct(p)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-(--surface) border border-dashed border-(--border-strong) rounded-(--r-lg)">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-(--surface2) text-(--text-3) mb-4">
              <X size={32} />
            </div>
            <p className="text-(--text-2) font-medium">No products found matching your criteria.</p>
            <button 
              onClick={() => {
                setActiveCategory('All');
                setMinPrice(0);
                setMaxPrice(maxAvailablePrice);
              }}
              className="mt-4 text-(--accent) font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="bg-(--accent) rounded-(--r-lg) py-7 px-8 flex justify-between items-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 space-y-2 text-white">
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">Limited Time</div>
          <h2 className="font-display text-3xl font-bold">Spring Refresh Event</h2>
          <p className="text-white/90">Get up to 30% off selected living room furniture.</p>
        </div>
        <button 
          onClick={() => navigate('/shop?sale=true')}
          className="bg-white text-(--accent) font-bold border-none rounded-(--r-sm) py-2.5 px-5 cursor-pointer relative z-10 shadow-lg hover:scale-105 transition-transform"
        >
          Shop the Sale
        </button>
      </section>
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </main>
  );
}
