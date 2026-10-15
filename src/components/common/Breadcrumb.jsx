"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Optional: friendly labels, or a different link target, for specific URL segments.
// Useful when a segment has no page of its own (e.g. /product has no index page).
const segmentConfig = {
    shop: { label: 'Shop' },
    category: { label: 'Categories' },
    product: { label: 'Categories', href: '/categories' },
}

const formatSegment = (seg) => decodeURIComponent(seg).replace(/-/g, ' ')

const Chevron = () => (
    <svg className='h-3.5 w-3.5 shrink-0 text-[#9CA3AF]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M9 6l6 6-6 6' />
    </svg>
)

const Breadcrumb = ({ labels = {} }) => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    // nothing to show on the home page
    if (segments.length === 0) return null

    const crumbs = segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/')
        const cfg = segmentConfig[seg]
        return {
            path,
            href: cfg?.href ?? path,
            label:
                labels[path] ??
                (segments[0] === 'product' && i === 1
                    ? 'Product details'
                    : cfg?.label ?? formatSegment(seg)),
        }
    })

    return (
        <nav aria-label='Breadcrumb' className='bg-[#F9FAFB]'>
            <div className='container px-4 py-3 xl:px-0'>
                <ol className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
                    <li className='flex items-center'>
                        <Link href='/' className='flex items-center gap-1.5 text-[#6B7280] transition-colors hover:text-[#2563EB]'>
                            <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                                <path d='M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10' />
                            </svg>
                            Home
                        </Link>
                    </li>

                    {crumbs.map((crumb, i) => {
                        const isLast = i === crumbs.length - 1
                        return (
                            <li key={crumb.path} className='flex min-w-0 items-center gap-2'>
                                <Chevron />
                                {isLast ? (
                                    <span aria-current='page' className='max-w-45 truncate font-medium text-[#111827] capitalize sm:max-w-100'>
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link href={crumb.href} className='text-[#6B7280] capitalize transition-colors hover:text-[#2563EB]'>
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </nav>
    )
}

export default Breadcrumb