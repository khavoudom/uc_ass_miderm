import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Product } from '../data/products';
import { useAppContext } from '../context/AppContext';
import { Heart, Check, Plus } from 'lucide-react';

export default function ProductCard({ p, index, onClick }: { p: Product; index: number; onClick: () => void }) {
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCartId(p.id);
    addToCart(p);
    setTimeout(() => setAddingToCartId(null), 1800);
  };

  const handleToggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(p.id);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-(--surface) rounded-(--r-lg) border border-(--border) overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-(--shadow-md) hover:-translate-y-[3px] hover:border-(--border-strong) group flex flex-col cursor-pointer"
      style={{ animation: `fadeUp 0.38s cubic-bezier(0.4, 0, 0.2, 1) ${index * 55}ms both` }}
    >
      <div className="relative aspect-square overflow-hidden bg-(--surface2)">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.06]" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {p.badge && (
            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${p.badge === 'sale' ? 'bg-(--red) text-white' : p.badge === 'new' ? 'bg-(--accent) text-white' : p.badge === 'hot' ? 'bg-(--amber) text-white' : 'bg-(--surface2) text-(--text-3) border border-(--border)'}`}>
              {p.badge}
            </span>
          )}
        </div>

        <button 
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center transition-opacity duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${wishlist.includes(p.id) ? '!opacity-100 bg-(--red-bg) border-(--red) text-(--red)' : 'opacity-0 group-hover:opacity-100 text-black'}`}
        >
          <Heart size={16} fill={wishlist.includes(p.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold text-(--text-2) uppercase tracking-wider">{p.category}</span>
          <span className="text-xs font-medium text-(--text-2)">{p.rating} ★</span>
        </div>
        <h3 className="font-bold text-base mb-1">{p.name}</h3>
        <div className="flex justify-between items-center mt-auto pt-4">
          <div className="flex gap-2 items-center">
            <span className={`text-base font-bold ${p.badge === 'sale' ? 'text-(--red)' : ''}`}>${p.price}</span>
            {p.origPrice && <span className="text-xs text-(--text-3) line-through">${p.origPrice}</span>}
          </div>
          <button 
            onClick={handleAddToCart}
            className={`w-8 h-8 text-white border-none rounded-(--r-sm) cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#1D4ED8] hover:scale-110 flex items-center justify-center ${addingToCartId === p.id ? 'bg-(--green)!' : 'bg-(--accent)'}`}
            aria-live="polite"
          >
            {addingToCartId === p.id ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
