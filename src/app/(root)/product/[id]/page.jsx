import { Suspense } from 'react'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/shop/ProductDetails'

async function getProduct(id) {
    'use cache'
    cacheLife('hours')

    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`)
    return res.json()
}

async function resolveProduct(params) {
    const { id } = await params
    if (!/^[1-9]\d*$/.test(id)) return null
    return getProduct(id)
}

export async function generateMetadata({ params }) {
    const product = await resolveProduct(params)
    if (!product) return { title: 'Product not found | ShopHub' }

    return {
        title: `${product.title} | ShopHub`,
        description: product.description,
    }
}

async function ProductContent({ params }) {
    const product = await resolveProduct(params)
    if (!product) notFound()

    return (
        <main className="bg-[#F9FAFB] py-8 lg:py-12">
            <div className="container px-4 xl:px-0">
                <ProductDetails product={product} />
            </div>
        </main>
    )
}

function ProductSkeleton() {
    return (
        <main className="bg-[#F9FAFB] py-8 lg:py-12">
            <div className="container grid animate-pulse gap-8 rounded-2xl bg-white p-4 sm:p-6 lg:grid-cols-2 lg:p-8">
                <div className="aspect-square rounded-xl bg-[#E5E7EB]" />
                <div className="space-y-4 py-4">
                    <div className="h-4 w-1/3 rounded bg-[#E5E7EB]" />
                    <div className="h-8 w-2/3 rounded bg-[#E5E7EB]" />
                    <div className="h-24 rounded bg-[#E5E7EB]" />
                    <div className="h-10 w-1/2 rounded bg-[#E5E7EB]" />
                </div>
            </div>
        </main>
    )
}

export default function ProductPage({ params }) {
    return (
        <Suspense fallback={<ProductSkeleton />}>
            <ProductContent params={params} />
        </Suspense>
    )
}
