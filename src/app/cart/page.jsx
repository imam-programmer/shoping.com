"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialCartItems = [
   {
      id: 1,
      name: "Velvet Sneaker",
      image: "https://readymadeui.com/images/product14.webp",
      price: 20.0,
      quantity: 2,
      size: "Small",
   },
   {
      id: 2,
      name: "Smart Watch Timex",
      image: "https://readymadeui.com/images/watch7.webp",
      price: 120.0,
      quantity: 1,
      size: "Small",
   },
   {
      id: 3,
      name: "Sun Glass",
      image: "https://readymadeui.com/images/sunglass1.webp",
      price: 50.0,
      quantity: 1,
      size: "Small",
   },
];

const SHIPPING = 2.0;
const TAX = 4.0;

const MinusIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
      <path
         d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
         data-original="#000000"
      />
   </svg>
);

const PlusIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
      <path
         d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
         data-original="#000000"
      />
   </svg>
);

function CartItem({ item, onRemove, onQuantityChange, onSizeChange }) {
   return (
      <li className="grid sm:grid-cols-3 items-start gap-4">
         <div className="flex flex-col sm:items-center sm:flex-row gap-6 sm:col-span-2">
            <div className="shrink-0 bg-gray-100 p-2 rounded-md sm:w-28 sm:h-28">
               <img
                  src={item.image}
                  className="w-full h-full object-contain"
                  alt={item.name}
               />
            </div>

            <div>
               <h3 className="text-base font-semibold text-slate-900">
                  {item.name}
               </h3>
               <button
                  type="button"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => onRemove(item.id)}
                  className="text-xs font-medium text-red-600 cursor-pointer mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
               >
                  Remove
               </button>

               <div className="flex gap-4 mt-6">
                  <select
                     value={item.size}
                     onChange={(e) => onSizeChange(item.id, e.target.value)}
                     className="px-2.5 py-1.5 border border-slate-300 text-slate-900 text-xs rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                     <option value="Small">Small</option>
                     <option value="Medium">Medium</option>
                     <option value="Large">Large</option>
                  </select>

                  {/* Quantity Selector */}
                  <div className="flex items-center px-2.5 py-1.5 border border-slate-300 text-slate-900 text-xs rounded-md">
                     <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                     >
                        <MinusIcon />
                     </button>
                     <span className="mx-3">{item.quantity}</span>
                     <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                     >
                        <PlusIcon />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <div className="sm:ml-auto">
            <h3 className="text-base font-semibold text-slate-900">
               ${(item.price * item.quantity).toFixed(2)}
            </h3>
         </div>
      </li>
   );
}

export default function ShoppingCart() {
   const [cartItems, setCartItems] = useState(initialCartItems);
   const [discount, setDiscount] = useState(0.0);
   const router=useRouter()

   const handleRemove = (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
   };

   const handleQuantityChange = (id, newQty) => {
      if (newQty < 1) return;
      setCartItems((prev) =>
         prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
   };

   const handleSizeChange = (id, newSize) => {
      setCartItems((prev) =>
         prev.map((item) => (item.id === id ? { ...item, size: newSize } : item))
      );
   };

   const handlePromoSubmit = (e) => {
      e.preventDefault();
      // Promo code logic placeholder
   };

   const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );
   const total = subtotal - discount + SHIPPING + TAX;

   return (
      <main className="px-4 md:px-8 mt-6">
         <div className="mx-auto container">
            <div className="mb-12">
               <h1 className="text-2xl font-bold text-slate-900">
                  Shopping Cart
               </h1>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
               {/* Shopping Cart Items */}
               <div className="lg:col-span-2">
                  <ul className="space-y-12 sm:space-y-8">
                     {cartItems.map((item) => (
                        <CartItem
                           key={item.id}
                           item={item}
                           onRemove={handleRemove}
                           onQuantityChange={handleQuantityChange}
                           onSizeChange={handleSizeChange}
                        />
                     ))}
                  </ul>
               </div>

               {/* Order Details */}
               <div className="bg-gray-100 border border-slate-200 rounded-md p-6 h-max md:sticky md:top-0">
                  <h2 className="text-xl font-semibold text-slate-900">
                     Order details
                  </h2>

                  <ul className="text-slate-600 font-medium mt-8 space-y-4">
                     <li className="flex flex-wrap gap-4 text-sm">
                        Discount{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           ${discount.toFixed(2)}
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm">
                        Shipping{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           ${SHIPPING.toFixed(2)}
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm">
                        Tax{" "}
                        <span className="ml-auto text-slate-900 font-semibold">
                           ${TAX.toFixed(2)}
                        </span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm text-slate-900">
                        Total{" "}
                        <span className="ml-auto font-semibold">
                           ${total.toFixed(2)}
                        </span>
                     </li>
                  </ul>

                  <div className="mt-8 space-y-3 text-center">
                     <button
                        type="button"
                        className="w-full px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                     >
                        Checkout
                     </button>
                     <button
                        onClick={()=>router.push("/category")}
                        className="inline-block cursor-pointer text-blue-700 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                     >
                        Continue Shopping
                     </button>
                  </div>
                
               </div>
            </div>
         </div>
      </main>
   );
}