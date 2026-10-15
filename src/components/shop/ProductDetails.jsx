'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddtoCart } from '@/lib/redux/AddtoCartSlice'

function Rating({ value, count }) {
    return (
        <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-[#111827]">{Number(value).toFixed(1)} / 5</span>
            <span className="text-amber-500" aria-label={`${value} out of 5 stars`}>
                {'★'.repeat(Math.round(value))}
                <span className="text-[#D1D5DB]">{'★'.repeat(5 - Math.round(value))}</span>
            </span>
            {count !== undefined && (
                <span className="text-[#6B7280]">({count} reviews)</span>
            )}
        </div>
    )
}

export default function ProductDetails({ product }) {
    const dispatch = useDispatch()
    const images = product.images?.length ? product.images : [product.thumbnail]
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [added, setAdded] = useState(false)

    const addToCart = () => {
        dispatch(
            AddtoCart({
                id: product.id,
                title: product.title,
                price: product.price,
                discount: product.discountPercentage,
                quantity: 1,
                image: product.thumbnail,
            })
        )
        setAdded(true)
    }

    return (
        <article className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F9FAFB]">
                        <Image
                            src={selectedImage}
                            alt={product.title}
                            fill
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-contain p-5"
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedImage(image)}
                                    aria-label={`View product image ${index + 1}`}
                                    aria-pressed={selectedImage === image}
                                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-white ${
                                        selectedImage === image ? 'border-[#2563EB]' : 'border-[#E5E7EB]'
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt=""
                                        fill
                                        sizes="80px"
                                        className="object-contain p-2"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6B7280]">
                        <Link href="/categories" className="capitalize hover:text-[#2563EB]">
                            {product.category}
                        </Link>
                        {product.brand && (
                            <>
                                <span aria-hidden="true">/</span>
                                <span>{product.brand}</span>
                            </>
                        )}
                    </div>

                    <h1 className="mt-3 text-2xl font-bold text-[#111827] sm:text-3xl">
                        {product.title}
                    </h1>
                    <div className="mt-3">
                        <Rating value={product.rating} count={product.reviews?.length ?? 0} />
                    </div>

                    <p className="mt-5 text-sm leading-6 text-[#4B5563]">
                        {product.description}
                    </p>

                    <div className="mt-6 flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-[#111827]">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                                {product.discountPercentage.toFixed(0)}% off
                            </span>
                        )}
                    </div>

                    <p className={`mt-3 text-sm font-medium ${
                        product.stock > 0 ? 'text-emerald-700' : 'text-red-600'
                    }`}>
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : 'Currently out of stock'}
                    </p>

                    <button
                        type="button"
                        onClick={addToCart}
                        disabled={product.stock <= 0}
                        className="mt-6 w-full cursor-pointer rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#9CA3AF] sm:w-auto"
                    >
                        {added ? 'Added to cart' : 'Add to cart'}
                    </button>

                    <dl className="mt-8 grid gap-3 border-t border-[#E5E7EB] pt-6 text-sm sm:grid-cols-2">
                        {product.sku && (
                            <div>
                                <dt className="text-[#6B7280]">SKU</dt>
                                <dd className="mt-1 font-medium text-[#111827]">{product.sku}</dd>
                            </div>
                        )}
                        {product.warrantyInformation && (
                            <div>
                                <dt className="text-[#6B7280]">Warranty</dt>
                                <dd className="mt-1 font-medium text-[#111827]">{product.warrantyInformation}</dd>
                            </div>
                        )}
                        {product.shippingInformation && (
                            <div>
                                <dt className="text-[#6B7280]">Shipping</dt>
                                <dd className="mt-1 font-medium text-[#111827]">{product.shippingInformation}</dd>
                            </div>
                        )}
                        {product.returnPolicy && (
                            <div>
                                <dt className="text-[#6B7280]">Returns</dt>
                                <dd className="mt-1 font-medium text-[#111827]">{product.returnPolicy}</dd>
                            </div>
                        )}
                    </dl>
                </div>
            </div>

            {product.reviews?.length > 0 && (
                <section className="mt-10 border-t border-[#E5E7EB] pt-8">
                    <h2 className="text-xl font-semibold text-[#111827]">Customer reviews</h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {product.reviews.slice(0, 4).map((review, index) => (
                            <blockquote key={`${review.reviewerName}-${index}`} className="rounded-xl bg-[#F9FAFB] p-4">
                                <Rating value={review.rating} />
                                <p className="mt-3 text-sm leading-6 text-[#4B5563]">
                                    “{review.comment}”
                                </p>
                                <footer className="mt-3 text-xs font-medium text-[#111827]">
                                    {review.reviewerName}
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </section>
            )}
        </article>
    )
}
