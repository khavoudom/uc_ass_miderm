import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CheckoutSuccess() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-(--green-bg) rounded-full flex items-center justify-center text-(--green) shadow-(--shadow-md)">
          <CheckCircle size={48} />
        </div>
      </div>
      
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-(--text-2) text-lg max-w-xl mx-auto mb-12">
        Your order has been placed successfully and is being processed. 
        We'll send you an email confirmation with tracking details shortly.
      </p>

      <div className="bg-(--surface) border border-(--border) rounded-(--r-lg) p-8 max-w-2xl mx-auto mb-12 shadow-(--shadow-sm)">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-sm font-bold text-(--text-3) uppercase tracking-widest mb-1">Order Number</p>
            <p className="text-xl font-bold font-mono">#LUM-{Math.floor(Math.random() * 900000) + 100000}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm font-bold text-(--text-3) uppercase tracking-widest mb-1">Estimated Delivery</p>
            <p className="text-xl font-bold">3-5 Business Days</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/shop" 
          className="bg-(--accent) text-white py-4 px-8 rounded-(--r-sm) font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-(--shadow-md)"
        >
          <ShoppingBag size={20} />
          Continue Shopping
        </Link>
        <Link 
          to="/" 
          className="bg-(--surface) text-(--text) border border-(--border-strong) py-4 px-8 rounded-(--r-sm) font-bold flex items-center justify-center gap-2 hover:bg-(--surface2) transition-all"
        >
          Go to Homepage
          <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}
