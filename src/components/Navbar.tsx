import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Sun, Moon, Search, Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme, cart } = useAppContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/shop`);
    }
    // Removed setSearchOpen(false) to keep it open as requested
  };

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <>
      <div className="w-full bg-(--accent) text-white text-xs text-center py-2 px-4 max-h-[36px]">
        Free shipping on all orders over $150
      </div>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-[60px] border-b border-(--border) backdrop-blur-md bg-(--surface)/80">
        <Link
          to="/"
          className="font-display font-bold text-xl tracking-tight text-(--text)"
        >
          Lumina
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink
            to="/shop"
            end
            className={({ isActive }) => 
              `transition-colors ${isActive && location.search === '' ? 'text-(--accent)' : 'text-(--text) hover:text-(--accent)'}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/shop?sale=true"
            className={() => 
              `transition-colors ${location.search === '?sale=true' ? 'text-(--accent)' : 'text-(--text) hover:text-(--accent)'}`
            }
          >
            Sale
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => 
              `transition-colors ${isActive ? 'text-(--accent)' : 'text-(--text) hover:text-(--accent)'}`
            }
          >
            About
          </NavLink>
        </div>
        <div className="flex items-center gap-4 text-(--text) relative">
          {searchOpen ? (
            <form
              ref={searchRef}
              onSubmit={handleSearch}
              className="flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className="bg-(--surface2) border border-(--border) rounded-(--r-sm) py-1 pl-3 pr-8 text-sm focus:outline-none focus:border-(--accent)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                className="absolute right-2 text-(--text-3) hover:text-(--text)"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-(--accent) transition-colors"
            >
              <Search size={20} />
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="hover:text-(--accent) transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link
            to="/wishlist"
            className="hover:text-(--accent) transition-colors"
          >
            <Heart size={20} />
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 hover:text-(--accent) transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-(--accent) border-2 border-(--surface) text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}
