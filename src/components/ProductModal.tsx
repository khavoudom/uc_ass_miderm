import { X, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../data/products';
import { useAppContext } from '../context/AppContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-(--surface) w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-(--r-xl) shadow-(--shadow-xl) flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-(--surface)/80 backdrop-blur hover:bg-(--surface2) transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-(--surface2) relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-widest bg-(--accent) text-white rounded-(--r-sm)">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-(--text-3) uppercase tracking-widest">{product.category}</span>
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">{product.name}</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-(--accent)">${product.price}</span>
              {product.origPrice && (
                <span className="text-lg text-(--text-3) line-through">${product.origPrice}</span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-(--border) mb-6">
            <button 
              className={`pb-2 px-4 text-sm font-medium transition-colors relative ${activeTab === 'description' ? 'text-(--text)' : 'text-(--text-3) hover:text-(--text)'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
              {activeTab === 'description' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--accent)" />}
            </button>
            <button 
              className={`pb-2 px-4 text-sm font-medium transition-colors relative ${activeTab === 'reviews' ? 'text-(--text)' : 'text-(--text-3) hover:text-(--text)'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
              {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--accent)" />}
            </button>
          </div>

          <div className="grow mb-8">
            {activeTab === 'description' ? (
              <p className="text-(--text-2) leading-relaxed">
                Experience the perfect blend of innovation and style with the {product.name}. 
                Crafted with meticulous attention to detail, this {product.category.toLowerCase()} item 
                is designed to enhance your daily life. Its sleek aesthetic and premium quality 
                make it a versatile addition to your personal collection.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-(--surface2) rounded-(--r-md)">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm">Alex Johnson</span>
                    <div className="flex text-amber-500"></div>
                  </div>
                  <p className="text-xs text-(--text-2)">"Absolutely love this piece! The quality is even better than I expected. Highly recommended."</p>
                </div>
                <div className="p-4 bg-(--surface2) rounded-(--r-md)">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm">Sarah Miller</span>
                    <div className="flex text-amber-500"></div>
                  </div>
                  <p className="text-xs text-(--text-2)">"Beautiful design and very sturdy. Fits perfectly in my living room."</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-(--border) rounded-(--r-sm) overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-(--surface2) transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-(--surface2) transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-(--r-sm) border transition-colors ${wishlist.includes(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-(--border) hover:bg-(--surface2)'}`}
              >
                <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-(--accent) text-white py-4 rounded-(--r-sm) font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-(--shadow-md)"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
