"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/cartSlice";
import { useCreateOrder } from "@/app/hook/useOrder";
import { orderService, CreateOrderDTO } from "@/service/orderService";
import { authService } from "@/service/authService";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  QrCode, 
  CheckCircle2, 
  Package, 
  ShieldCheck,
  ChevronRight,
  Loader2
} from "lucide-react";

type PaymentMethod = "QRIS" | "CASH" | "TRANSFER";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const { mutate: createOrder, isPending, isSuccess } = useCreateOrder();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authService.getUser();
    if (!userData) {
      router.push("/page/login");
    } else {
      setUser(userData);
    }
  }, [router]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    if (!user) return;

    const orderData: CreateOrderDTO = {
      userId: user.id,
      paymentMethod,
      paymentStatus: (paymentMethod === "CASH" ? "PENDING" : "PAID") as "PENDING" | "PAID",
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        stockId: item.stockID
      }))
    };

    createOrder(orderData, {
      onSuccess: () => {
        dispatch(clearCart());
        // Success state is handled by isSuccess
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
            <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tight">PESANAN BERHASIL!</h1>
          <p className="text-slate-400 text-lg">Terima kasih, pesanan Anda telah kami terima dan sedang diproses.</p>
          <button 
            onClick={() => router.push("/page/dashboard")}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-3xl font-black transition-all shadow-2xl shadow-indigo-600/30 text-lg active:scale-95"
          >
            KEMBALI KE DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <ShoppingCartLarge size={64} className="mx-auto text-slate-800" />
          <p className="text-slate-500 font-bold">Keranjang Anda kosong.</p>
          <button onClick={() => router.push("/page/dashboard")} className="text-indigo-400 font-bold hover:underline">Belanja Sekarang</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <div className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            KEMBALI
          </button>
          <h1 className="text-xl font-black text-white italic tracking-widest">CHECKOUT KONFIRMASI</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Summary and Items */}
          <div className="lg:col-span-7 space-y-10">
            <section>
              <h2 className="text-sm uppercase tracking-[0.3em] font-black text-indigo-500 mb-6 flex items-center gap-2">
                <Package size={16} />
                RINGKASAN PESANAN
              </h2>
              <div className="bg-slate-900/50 border border-slate-800/50 rounded-[2.5rem] overflow-hidden">
                <div className="divide-y divide-slate-800/50">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-slate-500 border border-slate-700 overflow-hidden shadow-inner">
                           {item.imgUrl && item.imgUrl !== "coba" ? (
                            <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={24} />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{item.name}</h4>
                          <p className="text-slate-500 text-sm font-bold">{item.quantity} x Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-white font-black text-lg">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-600/5 p-8 border-t border-slate-800/50">
                   <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold">Subtotal ({totalItems} Items)</span>
                    <span className="text-white font-black text-2xl">Rp {totalPrice.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Payment & Confirmation */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-sm uppercase tracking-[0.3em] font-black text-indigo-500 mb-6 flex items-center gap-2">
                <CreditCard size={16} />
                METODE PEMBAYARAN
              </h2>
              <div className="space-y-4">
                {[
                  { id: "CASH", name: "Tunai / Cash", icon: Banknote, color: "emerald" },
                  { id: "QRIS", name: "QRIS", icon: QrCode, color: "indigo" },
                  { id: "TRANSFER", name: "Transfer Bank", icon: CreditCard, color: "sky" }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className={`w-full p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${
                      paymentMethod === method.id 
                        ? `bg-${method.color}-500/10 border-${method.color}-500 shadow-lg shadow-${method.color}-500/10` 
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        paymentMethod === method.id 
                          ? `bg-${method.color}-500 text-white` 
                          : "bg-slate-800 text-slate-500 group-hover:text-slate-300"
                      }`}>
                        <method.icon size={24} />
                      </div>
                      <span className={`font-black tracking-tight text-lg ${
                        paymentMethod === method.id ? "text-white" : "text-slate-400"
                      }`}>{method.name}</span>
                    </div>
                    {paymentMethod === method.id && (
                      <div className={`w-6 h-6 rounded-full bg-${method.color}-500 flex items-center justify-center text-white animate-in zoom-in-50`}>
                        <CheckCircle2 size={14} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-[3rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[60px] rounded-full -mr-16 -mt-16" />

               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                    <ShieldCheck size={20} />
                    <span className="text-xs font-black uppercase tracking-wider">Garansi Keamanan Transaksi</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-slate-500 font-bold text-sm">
                      <span>Total Pesanan</span>
                      <span>Rp {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 font-bold text-sm">
                      <span>Biaya Layanan</span>
                      <span className="text-emerald-500">Gratis</span>
                    </div>
                    <div className="h-px bg-slate-800" />
                    <div className="flex justify-between items-end">
                      <span className="text-white font-black text-xl italic uppercase tracking-tighter">Total Akhir</span>
                      <span className="text-3xl font-black text-white italic tracking-tighter shadow-indigo-500/20">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
               </div>

               <button 
                  disabled={isPending}
                  onClick={handleConfirmOrder}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white py-6 rounded-[2rem] font-black transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] text-xl active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest group"
               >
                 {isPending ? (
                   <>
                     <Loader2 className="animate-spin" />
                     Memproses...
                   </>
                 ) : (
                   <>
                     Konfirmasi & Bayar
                     <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                   </>
                 )}
               </button>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

function ShoppingCartLarge(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}