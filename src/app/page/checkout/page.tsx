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
      onSuccess: (response) => {
        dispatch(clearCart());
        const orderId = response.data?.id || response.id;
        router.push(`/page/orders/${orderId}/nota`);
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <ShoppingCartLarge size={64} className="mx-auto text-slate-300" />
          <p className="text-slate-500 font-bold">Keranjang Anda kosong.</p>
          <button onClick={() => router.push("/page/dashboard")} className="text-primary font-bold hover:underline">Belanja Sekarang</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30 overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-outline-variant/20 bg-surface/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            KEMBALI
          </button>
          <h1 className="text-xl font-black text-on-surface italic tracking-widest">CHECKOUT KONFIRMASI</h1>
          <div className="w-10"></div> {/* Spacer */}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12 overflow-x-hidden max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left: Summary and Items */}
          <div className="md:col-span-12 lg:col-span-7 space-y-10">
            <section>
              <h2 className="text-sm uppercase tracking-[0.3em] font-black text-primary mb-6 flex items-center gap-2">
                <Package size={16} />
                RINGKASAN PESANAN
              </h2>
              <div className="bg-white border border-outline-variant/30 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="divide-y divide-outline-variant/20">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-surface-container rounded-2xl sm:rounded-3xl flex items-center justify-center text-slate-400 border border-outline-variant/30 overflow-hidden shadow-sm flex-shrink-0">
                           {item.imgUrl && item.imgUrl !== "coba" ? (
                            <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-on-surface text-base sm:text-lg truncate">{item.name}</h4>
                          <p className="text-slate-500 text-xs sm:text-sm font-bold">{item.quantity} x Rp {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-on-surface font-black text-base sm:text-lg ml-4">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 p-6 sm:p-8 border-t border-outline-variant/20">
                   <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold text-sm sm:text-base">Subtotal ({totalItems} Items)</span>
                    <span className="text-on-surface font-black text-xl sm:text-2xl">Rp {totalPrice.toLocaleString()}</span>
                   </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: Payment & Confirmation */}
          <div className="md:col-span-12 lg:col-span-5 space-y-8">
            <section>
              <h2 className="text-sm uppercase tracking-[0.3em] font-black text-primary mb-6 flex items-center gap-2">
                <CreditCard size={16} />
                METODE PEMBAYARAN
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  { id: "CASH", name: "Tunai / Cash", icon: Banknote, color: "emerald", lightColor: "emerald" },
                  { id: "QRIS", name: "QRIS", icon: QrCode, color: "emerald", lightColor: "emerald" },
                  { id: "TRANSFER", name: "Transfer Bank", icon: CreditCard, color: "emerald", lightColor: "emerald" }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className={`w-full p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border transition-all flex flex-row lg:flex-row items-center justify-between group shadow-sm ${
                      paymentMethod === method.id 
                        ? `bg-${method.lightColor}-500/10 border-${method.lightColor}-500 shadow-md` 
                        : "bg-white border-outline-variant hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                        paymentMethod === method.id 
                          ? `bg-${method.lightColor}-500 text-white` 
                          : "bg-surface-container-high text-slate-500 group-hover:text-primary"
                      }`}>
                        <method.icon size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <span className={`font-black tracking-tight text-sm sm:text-lg ${
                        paymentMethod === method.id ? "text-on-surface" : "text-slate-500"
                      }`}>{method.name}</span>
                    </div>
                    {paymentMethod === method.id && (
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${method.lightColor}-500 flex items-center justify-center text-white animate-in zoom-in-50 flex-shrink-0`}>
                        <CheckCircle2 size={12} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-low border border-outline-variant/30 rounded-[3rem] p-8 space-y-8 shadow-md relative overflow-hidden">
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />

               <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
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
                    <div className="h-px bg-outline-variant/50" />
                    <div className="flex justify-between items-end">
                      <span className="text-on-surface font-black text-xl italic uppercase tracking-tighter">Total Akhir</span>
                      <span className="text-3xl font-black text-on-surface italic tracking-tighter">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
               </div>

               <button 
                  disabled={isPending}
                  onClick={handleConfirmOrder}
                  className="w-full cta-gradient disabled:opacity-50 text-white py-6 rounded-[2rem] font-black transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] text-xl active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest group"
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