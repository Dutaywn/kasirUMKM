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
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-12 -translate-y-full bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="bg-slate-900 shadow-[0_-10px_40_rgba(0,0,0,0.5)] border-t border-slate-800 backdrop-blur-xl bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Section: Item List (Vertical Stack) */}
            <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-4 no-scrollbar">
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 flex items-center gap-2">
                <ShoppingCart size={12} />
                Daftar Pesanan
              </div>
              {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-800/40 p-4 rounded-3xl border border-slate-700/50 hover:bg-slate-800/60 transition-all group relative">
                    {/* Remove individual item button */}
                    <button 
                      onClick={() => dispatch(removeItemCompletely(item.id))}
                      className="absolute -top-2 -left-2 w-6 h-6 bg-slate-800 hover:bg-rose-500 text-slate-500 hover:text-white rounded-full border border-slate-700 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
                      title="Hapus dari Keranjang"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>

                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-800 rounded-2xl flex-shrink-0 overflow-hidden border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                        {item.imgUrl && item.imgUrl !== "coba" ? (
                          <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500">
                            <Package size={24} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white transition-colors group-hover:text-indigo-400">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500 font-medium">Rp {item.price.toLocaleString()} x {item.quantity}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                          <p className="text-sm text-indigo-400 font-black">
                            Rp {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700/50 shadow-inner">
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-all active:scale-90"
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      
                      <input 
                        type="number" 
                        value={item.quantity}
                        min="1"
                        onChange={(e) => dispatch(setQuantity({ id: item.id, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-12 bg-transparent text-center text-lg font-black text-white focus:outline-none focus:text-indigo-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button 
                        onClick={() => dispatch(addToCart(item))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-indigo-600 text-slate-400 hover:text-white transition-all active:scale-90"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
              ))}
            </div>

            {/* Right Section: Summary & Actions */}
            <div className="lg:w-[400px] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-10">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase font-bold text-slate-500 tracking-[0.2em]">Grand Total</p>
                    <p className="text-xs text-slate-600 font-bold">{totalItems} Produk Terpilih</p>
                  </div>
                  <h3 className="text-4xl font-black text-white italic bg-gradient-to-br from-white via-slate-200 to-indigo-500 bg-clip-text text-transparent">
                    Rp {totalPrice.toLocaleString()}
                  </h3>
                </div>
                
                <div className="h-px bg-gradient-to-r from-slate-800 to-transparent" />
                
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Informasi: Pastikan semua pesanan sudah sesuai sebelum menekan tombol checkout.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="w-full sm:w-auto p-5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-slate-800 hover:border-rose-500/20 active:scale-95"
                  title="Kosongkan Semua"
                >
                  <Trash2 size={24} />
                </button>
                <button className="flex-1 w-full flex items-center justify-center gap-4 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] active:scale-[0.98] group text-xl tracking-tight"
                onClick={handleCheckout}
                >
                  PROSES CHECKOUT
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
