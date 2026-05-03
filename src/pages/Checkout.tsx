import { useAppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout() {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      navigate('/checkout-success');
      setIsSubmitting(false);
    }, 1500);
  };

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-(--text-2) mb-8">Add some items before checking out.</p>
        <Link to="/shop" className="bg-[var(--accent)] text-white py-3 px-6 rounded-[var(--r-sm)] font-bold hover:bg-[#1D4ED8] transition-colors">
          Go to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <section className="bg-(--surface) p-6 rounded-(--r-lg) border border-(--border)">
            <h2 className="font-display text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Email address</label>
                <input type="email" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" placeholder="you@example.com" />
              </div>
            </div>
          </section>

          <section className="bg-(--surface) p-6 rounded-(--r-lg) border border-(--border)">
            <h2 className="font-display text-2xl font-bold mb-6">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">First name</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Last name</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">Address</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">City</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Postal code</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" />
              </div>
            </div>
          </section>

          <section className="bg-(--surface) p-6 rounded-(--r-lg) border border-(--border)">
            <h2 className="font-display text-2xl font-bold mb-6">Payment</h2>
            <div className="space-y-4">
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-2">Card number</label>
                <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Expiration date</label>
                  <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" placeholder="MM/YY" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">CVC</label>
                  <input type="text" className="w-full bg-(--surface2) border border-(--border) rounded-(--r-sm) p-3 focus:outline-none focus:border-(--accent)" placeholder="123" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:w-96">
          <div className="bg-(--surface) border border-(--border) rounded-(--r-lg) p-6 space-y-6 sticky top-24">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-(--r-sm) bg-(--surface2)" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-(--text-2) text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity || 1}
                    </span>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-(--text-3)">{item.category}</p>
                    </div>
                    <div className="font-bold text-sm">${item.price * (item.quantity || 1)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm pt-4 border-t border-(--border)">
              <div className="flex justify-between">
                <span className="text-(--text-2)">Subtotal</span>
                <span className="font-bold">${total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-(--text-2)">Shipping</span>
                <span className="font-bold">Free</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-(--border) flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-(--accent) text-white py-3 rounded-(--r-sm) font-bold hover:bg-[#1D4ED8] transition-all mt-6 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Order'
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
