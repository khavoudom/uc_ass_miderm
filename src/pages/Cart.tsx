import { useAppContext } from '../context/AppContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-2)]">
          <p className="mb-4">Your cart is currently empty.</p>
          <Link to="/shop" className="bg-(--accent) text-white border-none py-3 px-5 rounded-(--r-sm) font-semibold hover:bg-[#1D4ED8] transition-all inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {cart.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--r)] items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-(--r-sm) bg-(--surface2)" />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-[var(--text-2)]">{item.category}</p>
                </div>
                
                <div className="flex items-center gap-3 bg-(--surface2) rounded-(--r-sm) px-3 py-1">
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="p-1 hover:text-(--accent) transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="p-1 hover:text-(--accent) transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="font-bold w-20 text-center sm:text-right">${item.price * (item.quantity || 1)}</div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-[var(--text-3)] hover:text-[var(--red)] transition-colors p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="md:w-80 h-fit bg-[var(--surface)] border border-[var(--border)] rounded-[var(--r-lg)] p-6 space-y-6">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Subtotal</span>
                <span className="font-bold">${total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-2)]">Shipping</span>
                <span className="font-bold">Free</span>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <Link to="/checkout" className="w-full block text-center bg-(--accent) text-white py-3 rounded-(--r-sm) font-bold hover:bg-[#1D4ED8] transition-colors">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
