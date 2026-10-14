import Link from 'next/link'
import { buildHref } from '@/lib/shopUtils'

const base = 'flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium'

const Chevron = ({ dir }) => (
    <svg className='h-3.5 w-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
)

export default function Pagination({ filters, page, totalPages }) {
    if (totalPages <= 1) return null

    const count = Math.min(5, totalPages)
    const start = Math.max(1, Math.min(page - 2, totalPages - count + 1))
    const pages = Array.from({ length: count }, (_, i) => start + i)

    return (
        <nav aria-label='Pagination' className='mt-8 flex items-center justify-center gap-1.5'>
            {page > 1 ? (
                <Link href={buildHref(filters, { page: page - 1 })} aria-label='Previous page' className={`${base} border-[#E5E7EB] bg-white text-[#374151] hover:border-[#2563EB]`}>
                    <Chevron dir='left' />
                </Link>
            ) : (
                <span className={`${base} border-[#E5E7EB] bg-white text-[#D1D5DB]`}><Chevron dir='left' /></span>
            )}

            {pages.map((n) => (
                <Link
                    key={n}
                    href={buildHref(filters, { page: n })}
                    aria-current={n === page ? 'page' : undefined}
                    className={`${base} ${
                        n === page
                            ? 'border-[#2563EB] bg-[#2563EB] text-white'
                            : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#2563EB]'
                    }`}
                >
                    {n}
                </Link>
            ))}

            {page < totalPages ? (
                <Link href={buildHref(filters, { page: page + 1 })} aria-label='Next page' className={`${base} border-[#E5E7EB] bg-white text-[#374151] hover:border-[#2563EB]`}>
                    <Chevron dir='right' />
                </Link>
            ) : (
                <span className={`${base} border-[#E5E7EB] bg-white text-[#D1D5DB]`}><Chevron dir='right' /></span>
            )}
        </nav>
    )
}