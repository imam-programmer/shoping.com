import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import ProductCard from '@/components/shop/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import SortSelect from '@/components/shop/SortSelect'
import Pagination from '@/components/shop/Pagination'
import { PER_PAGE, PRICE_MAX } from '@/lib/shopUtils'

export const metadata = {
    title: 'Shop | ShopHub',
    description: 'Browse all products on ShopHub.',
}

async function getAllProducts() {
    'use cache'
    cacheLife('hours')

    const res = await fetch(
        'https://dummyjson.com/products?limit=0&select=id,title,price,rating,category,brand,thumbnail,reviews'
    )
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json()
    return data.products
}

const list = (v) => (v ? v.split(',').filter(Boolean) : [])

const sorters = {
    popularity: (a, b) => b.rating - a.rating,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
}

async function ShopContent({ searchParams }) {
    const sp = await searchParams

    const filters = {
        category: list(sp.category),
        brand: list(sp.brand),
        min: Math.max(0, Number(sp.min) || 0),
        max: Math.min(PRICE_MAX, Number(sp.max) || PRICE_MAX),
        rating: Number(sp.rating) || 0,
        sort: sorters[sp.sort] ? sp.sort : 'popularity',
        page: Math.max(1, Number(sp.page) || 1),
    }

    const all = await getAllProducts()

    // sidebar facets: top N by count, plus anything already selected
    const facet = (key, selected, n) => {
        const m = new Map()
        for (const p of all) if (p[key]) m.set(p[key], (m.get(p[key]) || 0) + 1)
        return [...m.entries()]
            .sort((a, b) => b[1] - a[1])
            .filter(([name], i) => i < n || selected.includes(name))
    }
    const categories = facet('category', filters.category, 6)
    const brands = facet('brand', filters.brand, 5)
    const ratings = [4, 3, 2, 1].map((value) => ({
        value,
        count: all.filter((p) => p.rating >= value).length,
    }))

    // filter + sort
    const result = all
        .filter(
            (p) =>
                (!filters.category.length || filters.category.includes(p.category)) &&
                (!filters.brand.length || filters.brand.includes(p.brand)) &&
                p.price >= filters.min &&
                (filters.max >= PRICE_MAX || p.price <= filters.max) &&
                p.rating >= filters.rating
        )
        .sort(sorters[filters.sort])

    // paginate
    const total = result.length
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
    const page = Math.min(filters.page, totalPages)
    const startIdx = (page - 1) * PER_PAGE
    const items = result.slice(startIdx, startIdx + PER_PAGE)
    const current = { ...filters, page }

    return (
        <div className='grid items-start gap-5 lg:grid-cols-[208px_1fr]'>
            <FilterSidebar filters={current} categories={categories} brands={brands} ratings={ratings} />

            <div>
                <div className='mb-4 flex items-center justify-between gap-3'>
                    <p className='text-xs text-[#4B5563] sm:text-sm'>
                        {total === 0
                            ? 'No products found'
                            : `Showing ${startIdx + 1}–${startIdx + items.length} of ${total} products`}
                    </p>
                    <SortSelect filters={current} />
                </div>

                {items.length === 0 ? (
                    <p className='rounded-[10px] bg-white py-20 text-center text-[#6B7280]'>
                        No products match your filters.
                    </p>
                ) : (
                    <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4'>
                        {items.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                )}

                <Pagination filters={current} page={page} totalPages={totalPages} />
            </div>
        </div>
    )
}

function ShopSkeleton() {
    return (
        <div className='grid items-start gap-5 lg:grid-cols-[208px_1fr]'>
            <div className='h-12 animate-pulse rounded-[10px] bg-[#E5E7EB] lg:h-100' />
            <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4'>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className='h-60 animate-pulse rounded-[10px] bg-[#E5E7EB]' />
                ))}
            </div>
        </div>
    )
}

export default function ShopPage({ searchParams }) {
    return (
        <section className='bg-[#F9FAFB] py-6 lg:py-10'>
            <div className='container px-4 xl:px-0'>
                <h1 className='sr-only'>Shop</h1>
                <Suspense fallback={<ShopSkeleton />}>
                    <ShopContent searchParams={searchParams} />
                </Suspense>
            </div>
        </section>
    )
}