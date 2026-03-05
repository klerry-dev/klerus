import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function Cart({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <ShoppingBag size={24} className="text-brand-accent" />
          <div>
            <h2 className="text-xl font-bold">Cart</h2>
            <p className="text-sm text-white/60">{itemCount} items</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white/40">
            <ShoppingBag size={48} className="mb-4" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass rounded-2xl p-4 flex gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider">
                      {item.category}
                    </p>
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-brand-accent">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-white/10 px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/60">Subtotal</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onClearCart}
            className="w-full py-3 border border-white/20 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Clear Cart
          </button>
          <button className="w-full py-3 bg-brand-accent text-black rounded-xl font-bold hover:bg-brand-accent/90 transition-colors">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
