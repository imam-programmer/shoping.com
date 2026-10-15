"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import navData from '@/api/navData.json'
import SearchSVG from '@/svgs/SearchSVG'
import CartSVG from '@/svgs/CartSVG'
import UserSVG from '@/svgs/UserSVG'
import MenuSVG from '@/svgs/MenuSVG'
import MenuXSVG from '@/svgs/MenuXSVG'
import { auth } from '../../firebase.config'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [mounted, setMounted] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)

    const cartData = useSelector((state) => state.cart.items)
    const router = useRouter()

    // Prevent server/client hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Firebase authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => unsubscribe()
    }, [])

    // Product search suggestions
    useEffect(() => {
        const query = searchQuery.trim()

        if (!query) {
            setSuggestions([])
            setIsSearching(false)
            setSearchError('')
            return
        }

        const controller = new AbortController()

        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=6&select=id,title,price,thumbnail,category`,
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error('Failed to load product suggestions.')
                }

                const data = await response.json()

                if (!Array.isArray(data.products)) {
                    throw new Error('Invalid product suggestions response.')
                }

                setSuggestions(data.products)
                setSearchError('')
            } catch (error) {
                if (error.name === 'AbortError') return

                setSuggestions([])
                setSearchError('Unable to load suggestions. Please try again.')
            } finally {
                if (!controller.signal.aborted) {
                    setIsSearching(false)
                }
            }
        }, 250)

        return () => {
            clearTimeout(timeoutId)
            controller.abort()
        }
    }, [searchQuery])

    function handleNavLink(link) {
        router.push(link)
        setOpen(false)
    }

    function handleSearch(event) {
        event.preventDefault()

        const query = searchQuery.trim()

        if (query) {
            setShowSuggestions(false)
            router.push(`/categories?search=${encodeURIComponent(query)}`)
        }
    }

    const avatarLabel = (
        user?.displayName || user?.email || 'User'
    ).trim().charAt(0).toUpperCase()

    // Avoid reading a browser-restored cart count before mounting.
    const cartCount = mounted
        ? cartData.reduce(
            (total, item) => total + (Number(item.quantity) || 1),
            0
        )
        : 0

    return (
        <header className="relative">
            <nav className="container my-3 flex flex-wrap items-center justify-between gap-y-3 px-4 xl:px-0 lg:flex-nowrap">

                {/* Logo, desktop navigation and mobile menu */}
                <div className="flex shrink-0 items-center gap-x-3 lg:gap-x-8">
                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className="-ml-1 cursor-pointer p-1 text-[#374151] lg:hidden"
                    >
                        {open ? (
                            <MenuSVG className="h-6 w-6" />
                        ) : (
                            <MenuXSVG className="h-6 w-6" />
                        )}
                    </button>

                    <Link href="/" className="text-[24px] font-bold">
                        ShopHub
                    </Link>

                    <ul className="hidden items-center gap-x-8 lg:flex">
                        {navData.map((item) => (
                            <li key={item.id}>
                                <Link
                                    href={item.path}
                                    className="cursor-pointer text-base font-normal text-[#374151]"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    role="search"
                    className="relative order-last flex w-full items-center gap-3.25 rounded-[10px] border border-[#d1d5db] px-3 py-2.5 lg:order-0 lg:mx-20.25"
                >
                    <button
                        type="submit"
                        aria-label="Search products"
                        className="shrink-0 cursor-pointer"
                    >
                        <SearchSVG className="h-4 w-4" />
                    </button>

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => {
                            const value = event.target.value
                            setSearchQuery(value)
                            setShowSuggestions(true)
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={(event) => {
                            if (event.key === 'Escape') {
                                setShowSuggestions(false)
                            }
                        }}
                        placeholder="Search products..."
                        aria-label="Search products"
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                        aria-expanded={
                            showSuggestions && Boolean(searchQuery.trim())
                        }
                        aria-controls="product-search-suggestions"
                        className="w-full outline-none placeholder:text-[#ADAEBC]"
                    />
                </form>

                {/* Cart and user */}
                <div className="flex shrink-0 items-center gap-5 lg:gap-8">
                    <div className="relative">
                        <Link href="/cart" aria-label={`Shopping cart, ${cartCount} items`}>
                            <CartSVG className="h-5 w-[22.5px] cursor-pointer" />
                        </Link>

                        <span
                            aria-live="polite"
                            className="absolute -right-3 -top-5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[12px] text-white"
                        >
                            {cartCount}
                        </span>
                    </div>

                    {user ? (
                        <Link
                            href="/profile"
                            aria-label={`View profile for ${user.email || 'user'}`}
                            className="flex max-w-48 cursor-pointer items-center gap-2"
                        >
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2563EB] bg-cover bg-center text-sm font-semibold text-white"
                                style={
                                    user.photoURL
                                        ? {
                                            backgroundImage: `url("${user.photoURL}")`,
                                        }
                                        : undefined
                                }
                            >
                                {!user.photoURL && avatarLabel}
                            </span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            aria-label="Log in"
                            className="cursor-pointer"
                        >
                            <UserSVG className="h-5 w-[17.5px] cursor-pointer" />
                        </Link>
                    )}
                </div>
            </nav>

            {/* Search suggestions */}
            {showSuggestions && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full z-50 px-4 xl:px-0">
                    <div className="container">
                        <div
                            id="product-search-suggestions"
                            role="listbox"
                            aria-label="Product suggestions"
                            className="ml-auto max-h-[min(70vh,28rem)] w-full overflow-y-auto rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-xl lg:w-2/3"
                        >
                            {isSearching ? (
                                <p
                                    className="px-4 py-5 text-sm text-[#6B7280]"
                                    role="status"
                                >
                                    Searching products...
                                </p>
                            ) : searchError ? (
                                <p
                                    className="px-4 py-5 text-sm text-[#B91C1C]"
                                    role="alert"
                                >
                                    {searchError}
                                </p>
                            ) : suggestions.length ? (
                                suggestions.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        role="option"
                                        aria-selected="false"
                                        onClick={() => setShowSuggestions(false)}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#F9FAFB] focus:bg-[#F9FAFB] focus:outline-none"
                                    >
                                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#F9FAFB]">
                                            <Image
                                                src={product.thumbnail}
                                                alt=""
                                                fill
                                                sizes="48px"
                                                className="object-contain"
                                            />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium text-[#111827]">
                                                {product.title}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs capitalize text-[#6B7280]">
                                                {product.category}
                                            </span>
                                        </span>

                                        <span className="shrink-0 text-sm font-semibold text-[#111827]">
                                            ${Number(product.price).toFixed(2)}
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <p
                                    className="px-4 py-5 text-sm text-[#6B7280]"
                                    role="status"
                                >
                                    No matching products found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile navigation */}
            {open && (
                <ul className="container flex flex-col px-4 pb-3 xl:px-0 lg:hidden">
                    {navData.map((item) => (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => handleNavLink(item.path)}
                                className="w-full cursor-pointer border-b border-[#e5e7eb] py-3 text-start text-base font-normal text-[#374151]"
                            >
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

export default Navbar
