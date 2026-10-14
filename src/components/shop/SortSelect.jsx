"use client"

import { useRouter } from 'next/navigation'
import { buildHref } from '@/lib/shopUtils'

const options = [
    { value: 'popularity', label: 'Sort by: Popularity' },
    { value: 'price-asc', label: 'Sort by: Price, Low to High' },
    { value: 'price-desc', label: 'Sort by: Price, High to Low' },
]

export default function SortSelect({ filters }) {
    const router = useRouter()

    return (
        <select
            value={filters.sort}
            aria-label='Sort products'
            onChange={(e) =>
                router.push(buildHref(filters, { sort: e.target.value, page: 1 }), { scroll: false })
            }
            className='cursor-pointer rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs text-[#374151] outline-none focus:border-[#2563EB]'
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    )
}