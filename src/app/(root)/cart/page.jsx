
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   ClearCart,
   RemoveFromCart,
   UpdateQuantity,
} from '@/lib/redux/AddtoCartSlice'
import Link from 'next/link'

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

function CartItem({ item, onRemove, onQuantityChange }) {
   return (
      <li className="grid sm:grid-cols-3 items-start gap-4">
         <div className="flex flex-col sm:items-center sm:flex-row gap-6 sm:col-span-2">
            <div className="shrink-0 bg-gray-100 p-2 rounded-md sm:w-28 sm:h-28">
               <img
                  src={item.image}
                  className="w-full h-full object-contain"
                  alt={item.title}
               />
            </div>

            <div>
               <h3 className="text-base font-semibold text-slate-900">
                  {item.title}
               </h3>
               <button
                  type="button"
                  aria-label={`Remove ${item.title} from cart`}
                  onClick={() => onRemove(item.id)}
                  className="text-xs font-medium text-red-600 cursor-pointer mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
               >
                  Remove
               </button>

               <div className="flex gap-4 mt-6">


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
   const cartItems = useSelector((state) => state.cart.items)
   const dispatch = useDispatch()

   const [discount, setDiscount] = useState(0)
   const router = useRouter()

   const handleRemove = (id) => {
      dispatch(RemoveFromCart(id))
   }

   const handleQuantityChange = (id, newQty) => {
      if (newQty < 1) return

      dispatch(
         UpdateQuantity({
            id,
            quantity: newQty,
         })
      )
   }

   const handleCheckout = () => {
      if (cartItems.length === 0) {
         alert('Your cart is empty')
         return
      }

      dispatch(ClearCart())
      alert('Checkout successfully')
   }

   const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   )

   const SHIPPING = cartItems.length > 0 ? 2 : 0
   const TAX = cartItems.length > 0 ? 4 : 0

   const total = Math.max(0, subtotal - discount) + SHIPPING + TAX

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
                  {cartItems.length === 0 ? (
                     <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d1d5db] bg-white px-6 py-16 text-center sm:py-20">
                        {/* icon */}
                        <div className="relative mb-6">
                           <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl" />
                           <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-50 to-blue-100 sm:h-28 sm:w-28">
                              <svg
                                 className="h-11 w-11 text-[#2563EB] sm:h-12 sm:w-12"
                                 viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor"
                                 strokeWidth="1.6"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 aria-hidden="true"
                              >
                                 <circle cx="9" cy="20" r="1.5" />
                                 <circle cx="18" cy="20" r="1.5" />
                                 <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6" />
                              </svg>
                           </div>
                        </div>

                        <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
                           Your cart is empty
                        </h2>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B7280] sm:text-base">
                           Looks like you haven&apos;t added anything yet. Explore our products and find something you love.
                        </p>

                        <Link
                           href="/categories"
                           className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-[#2563EB] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[#1D4ED8]"
                        >
                           Start Shopping
                           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                           </svg>
                        </Link>
                     </div>

                  ) : (
                     <ul className="space-y-12 sm:space-y-8">
                        {cartItems.map((item) => (
                           <CartItem
                              key={item.id}
                              item={item}
                              onRemove={handleRemove}
                              onQuantityChange={handleQuantityChange}
                           />
                        ))}
                     </ul>
                  )}
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
                     <button onClick={handleCheckout}
                        type="button"
                        className="w-full px-4 py-2.5 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                     >
                        Checkout
                     </button>
                     <button
                        onClick={() => router.push("/categories")}
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