import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart, clearCart, removeItemCompletely, setQuantity } from "@/redux/cartSlice";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartBottom() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) return null;
  const handleCheckout = () => {
    router.push("/page/checkout");
  }

  return (
    <div className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-12 -translate-y-full bg-gradient-to-t from-surface to-transparent pointer-events-none" />

      <div className="bg-white/90 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-outline-variant/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            
            {/* Left Section: Item List (Vertical Stack) */}
            <div className="flex-1 space-y-2 lg:space-y-4 max-h-[160px] lg:max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              <div className="hidden lg:flex text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 items-center gap-2">
                <ShoppingCart size={12} />
                Daftar Pesanan
              </div>
              {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-surface border border-outline-variant/20 p-2 sm:p-4 rounded-2xl lg:rounded-3xl hover:border-primary/50 transition-all group relative shadow-sm">
                    {/* Remove individual item button */}
                    <button 
                      onClick={() => dispatch(removeItemCompletely(item.id))}
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 lg:w-6 lg:h-6 bg-white hover:bg-error text-slate-400 hover:text-white rounded-full border border-outline-variant flex items-center justify-center transition-all opacity-0 lg:group-hover:opacity-100 z-20 shadow-sm"
                      title="Hapus dari Keranjang"
                    >
                      <X className="w-2.5 h-2.5 lg:w-3 lg:h-3" strokeWidth={3} />
                    </button>

                    <div className="flex items-center gap-3 lg:gap-5">
                      <div className="w-10 h-10 lg:w-14 lg:h-14 bg-white rounded-xl lg:rounded-2xl flex-shrink-0 overflow-hidden border border-outline-variant/30 group-hover:border-primary/50 transition-colors shadow-sm">
                        {item.imgUrl && item.imgUrl !== "coba" ? (
                          <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <Package size={window.innerWidth < 1024 ? 16 : 24} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm lg:text-base font-bold text-on-surface transition-colors group-hover:text-primary truncate max-w-[120px] sm:max-w-none">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5 lg:mt-1">
                          <span className="text-[10px] lg:text-xs text-slate-500 font-medium whitespace-nowrap">Rp {item.price.toLocaleString()} x {item.quantity}</span>
                          <span className="hidden sm:block w-0.5 h-0.5 rounded-full bg-outline-variant"></span>
                          <p className="text-xs lg:text-sm text-on-surface font-black whitespace-nowrap">
                            Rp {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-3 bg-white p-1 rounded-xl lg:rounded-2xl border border-outline-variant/30 shadow-sm">
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg lg:rounded-xl bg-surface hover:bg-surface-container-high text-slate-500 hover:text-error transition-all active:scale-90"
                      >
                        <Minus className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={3} />
                      </button>
                      
                      <input 
                        type="number" 
                        value={item.quantity}
                        min="1"
                        onChange={(e) => dispatch(setQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-8 lg:w-12 bg-transparent text-center text-sm lg:text-lg font-black text-on-surface focus:outline-none focus:text-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button 
                        onClick={() => dispatch(addToCart(item))}
                        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg lg:rounded-xl bg-surface hover:bg-primary text-slate-500 hover:text-white transition-all active:scale-90"
                      >
                        <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
              ))}
            </div>

            {/* Right Section: Summary & Actions */}
            <div className="lg:w-[400px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/30 pt-4 lg:pt-0 lg:pl-10">
              <div className="space-y-2 lg:space-y-4 mb-4 lg:mb-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5 lg:space-y-1">
                    <p className="text-[9px] lg:text-[11px] uppercase font-bold text-slate-500 tracking-[0.2em]">Grand Total</p>
                    <p className="text-[10px] lg:text-xs text-slate-500 font-bold">{totalItems} Produk</p>
                  </div>
                  <h3 className="text-2xl lg:text-4xl font-black text-on-surface">
                    Rp {totalPrice.toLocaleString()}
                  </h3>
                </div>
                
                <div className="h-px bg-gradient-to-r from-outline-variant/50 to-transparent" />
                
                <p className="hidden lg:block text-xs text-slate-500 leading-relaxed font-medium">
                  Informasi: Pastikan semua pesanan sudah sesuai sebelum menekan tombol checkout.
                </p>
              </div>
              
              <div className="flex flex-row items-center gap-3 lg:gap-4">
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="p-3 lg:p-5 text-error hover:bg-error/10 rounded-xl lg:rounded-2xl transition-all border border-error/20 hover:border-error/40 active:scale-95 flex-shrink-0"
                  title="Kosongkan Semua"
                >
                  <Trash2 className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 lg:gap-4 cta-gradient text-white px-6 lg:px-10 py-3 lg:py-5 rounded-xl lg:rounded-2xl font-black transition-all shadow-lg shadow-primary/20 active:scale-[0.98] group text-sm lg:text-xl tracking-tight"
                onClick={handleCheckout}
                >
                  CHECKOUT
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
