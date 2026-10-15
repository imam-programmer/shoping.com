import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import ProductCard from '@/components/shop/ProductCard'
import FilterSidebar from '@/components/shop/FilterSidebar'
import SortSelect from '@/components/shop/SortSelect'
import Pagination from '@/components/shop/Pagination'
import { PER_PAGE } from '@/lib/shopUtils'

export const metadata = {
    title: 'Categories | ShopHub',
    description: 'Browse and filter all products by category, price, brand, and rating.',
}

async function getAllProducts() {
    'use cache'
    cacheLife('hours')

    const res = await fetch(
        'https://dummyjson.com/products?limit=0&select=id,title,description,price,rating,category,brand,thumbnail,reviews'
    )
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json()
    return data.products
}

const list = (value) =>
    typeof value === 'string'
        ? [...new Set(value.split(',').filter(Boolean))]
        : []

const sorters = {
    popularity: (a, b) => b.rating - a.rating,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
}

async function CategoriesContent({ searchParams }) {
    const sp = await searchParams

    const all = await getAllProducts()
    const maxPrice = Math.max(10, ...all.map((product) => product.price))
    const parseBound = (value, fallback) => {
        if (value === undefined || value === '') return fallback
        const parsed = Number(value)
        return Number.isFinite(parsed) ? Math.max(0, Math.min(maxPrice, parsed)) : fallback
    }
    const min = parseBound(sp.min, 0)
    const max = Math.max(min, parseBound(sp.max, maxPrice))
    const requestedRating = Number(sp.rating)

    const filters = {
        search: typeof sp.search === 'string' ? sp.search.trim() : '',
        category: list(sp.category),
        brand: list(sp.brand),
        min,
        max,
        priceMax: maxPrice,
        rating: [1, 2, 3, 4].includes(requestedRating) ? requestedRating : 0,
        sort: Object.hasOwn(sorters, sp.sort) ? sp.sort : 'popularity',
        page: Math.max(1, Math.floor(Number(sp.page)) || 1),
    }

    const facet = (key) => {
        const m = new Map()
        for (const p of all) if (p[key]) m.set(p[key], (m.get(p[key]) || 0) + 1)
        return [...m.entries()]
            .sort((a, b) => b[1] - a[1])
    }
    const categories = facet('category')
    const brands = facet('brand')
    const ratings = [4, 3, 2, 1].map((value) => ({
        value,
        count: all.filter((p) => p.rating >= value).length,
    }))

    // filter + sort
    const result = all
        .filter(
            (p) =>
                (!filters.search ||
                    [p.title, p.description, p.category, p.brand]
                        .some((value) => value?.toLowerCase().includes(filters.search.toLowerCase()))) &&
                (!filters.category.length || filters.category.includes(p.category)) &&
                (!filters.brand.length || filters.brand.includes(p.brand)) &&
                p.price >= filters.min &&
                p.price <= filters.max &&
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
                        {filters.search && (
                            <span className='mr-1'>
                                Results for &quot;{filters.search}&quot;:
                            </span>
                        )}
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

function CategoriesSkeleton() {
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

export default function CategoriesPage({ searchParams }) {
    return (
        <section className='bg-[#F9FAFB] py-6 lg:py-10'>
            <div className='container px-4 xl:px-0'>
                <h1 className='sr-only'>Categories</h1>
                <Suspense fallback={<CategoriesSkeleton />}>
                    <CategoriesContent searchParams={searchParams} />
                </Suspense>
            </div>
        </section>
    )
}