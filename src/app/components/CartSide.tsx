import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart, clearCart, removeItemCompletely, setQuantity } from "@/redux/cartSlice";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus, Package, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartSideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSide({ isOpen, onClose }: CartSideProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    router.push("/page/checkout");
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[70] transform transition-transform duration-500 ease-in-out border-l border-outline-variant/30 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full bg-surface-container-lowest">
          
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                <ShoppingCart size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-on-surface tracking-tight">Pesanan</h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{totalItems} Produk di Keranjang</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-surface-container-high rounded-2xl text-slate-400 hover:text-on-surface transition-all active:scale-90 border border-outline-variant/20"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Body: Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center text-slate-400">
                  <Package size={40} />
                </div>
                <p className="font-bold text-slate-500">Keranjang masih kosong</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white border border-outline-variant/20 p-4 rounded-3xl hover:border-primary/50 transition-all group relative shadow-sm">
                  {/* Remove individual item button */}
                  <button 
                    onClick={() => dispatch(removeItemCompletely(item.id))}
                    className="absolute -top-1.5 -left-1.5 w-6 h-6 bg-white hover:bg-error text-slate-400 hover:text-white rounded-full border border-outline-variant flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 shadow-sm"
                  >
                    <X className="w-3 h-3" strokeWidth={3} />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex-shrink-0 overflow-hidden border border-outline-variant/30 group-hover:border-primary/50 transition-colors shadow-sm">
                      {item.imgUrl && item.imgUrl !== "coba" ? (
                        <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Package size={24} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-on-surface transition-colors group-hover:text-primary truncate max-w-[140px]">{item.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">Rp {item.price.toLocaleString()} / unit</p>
                      <p className="text-sm text-on-surface font-black mt-1">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-error/10 text-slate-500 hover:text-error transition-all active:scale-90 shadow-sm"
                    >
                      <Minus className="w-4 h-4" strokeWidth={3} />
                    </button>
                    
                    <span className="w-8 text-center text-lg font-black text-on-surface">{item.quantity}</span>

                    <button 
                      onClick={() => dispatch(addToCart(item))}
                      className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-primary text-slate-500 hover:text-white transition-all active:scale-90 shadow-sm"
                    >
                      <Plus className="w-4 h-4" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Summary & Actions */}
          <div className="p-6 border-t border-outline-variant/30 bg-white space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-slate-500">
                <p className="text-xs font-bold uppercase tracking-widest">Subtotal</p>
                <p className="font-bold">Rp {totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">Grand Total</p>
                  <p className="text-xs text-slate-500 font-bold">{totalItems} Item Produk</p>
                </div>
                <h3 className="text-3xl font-black text-on-surface">
                  Rp {totalPrice.toLocaleString()}
                </h3>
              </div>
              
              <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/5 flex-shrink-0 flex items-center justify-center text-primary">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-[10px] font-medium text-slate-600 leading-relaxed">
                  Semua transaksi tercatat secara otomatis ke dalam laporan harian. Pastikan data sudah benar.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-4 cta-gradient text-white py-5 rounded-2xl font-black transition-all shadow-lg shadow-primary/20 active:scale-[0.98] group text-xl tracking-tight disabled:opacity-50"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                PROSES CHECKOUT
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => dispatch(clearCart())}
                disabled={cartItems.length === 0}
                className="w-full py-4 text-error font-bold hover:bg-error/5 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-30"
              >
                <Trash2 className="w-4 h-4" />
                Kosongkan Keranjang
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

