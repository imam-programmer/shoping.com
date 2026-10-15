"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { buildHref } from '@/lib/shopUtils'

const thumb =
    'pointer-events-none absolute inset-0 h-5 w-full appearance-none bg-transparent ' +
    '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2563EB] ' +
    '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#2563EB]'

const Section = ({ title, children }) => (
    <details open className='group border-b border-[#F3F4F6] py-4 first:pt-0 last:border-0 last:pb-0'>
        <summary className='flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-[#111827] [&::-webkit-details-marker]:hidden'>
            {title}
            <svg className='h-3.5 w-3.5 text-[#9CA3AF] transition-transform group-open:rotate-180' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M6 9l6 6 6-6' />
            </svg>
        </summary>
        <div className='mt-3'>{children}</div>
    </details>
)

const CheckRow = ({ label, count, checked, onChange }) => (
    <label className='flex cursor-pointer items-center gap-2 py-1 text-xs text-[#4B5563]'>
        <input
            type='checkbox'
            checked={checked}
            onChange={onChange}
            className='h-3.5 w-3.5 cursor-pointer rounded accent-[#2563EB]'
        />
        <span className='flex-1 capitalize'>{label.replace(/-/g, ' ')}</span>
        <span className='text-[#9CA3AF]'>{count}</span>
    </label>
)

// remounted via `key` when the URL values change, so local state never goes stale
function PriceRange({ min: initMin, max: initMax, priceMax, onCommit }) {
    const [min, setMin] = useState(initMin)
    const [max, setMax] = useState(initMax)

    const commit = () => onCommit(min, max)

    return (
        <div>
            <div className='relative h-5'>
                <div className='absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-[#E5E7EB]' />
                <div
                    className='absolute top-1/2 h-1 -translate-y-1/2 rounded bg-[#2563EB]'
                    style={{ left: `${(min / priceMax) * 100}%`, right: `${100 - (max / priceMax) * 100}%` }}
                />
                <input
                    type='range'
                    min={0}
                    max={priceMax}
                    step={10}
                    value={min}
                    aria-label='Minimum price'
                    onChange={(e) => setMin(Math.min(Number(e.target.value), max - 10))}
                    onPointerUp={commit}
                    onKeyUp={commit}
                    className={thumb}
                />
                <input
                    type='range'
                    min={0}
                    max={priceMax}
                    step={10}
                    value={max}
                    aria-label='Maximum price'
                    onChange={(e) => setMax(Math.max(Number(e.target.value), min + 10))}
                    onPointerUp={commit}
                    onKeyUp={commit}
                    className={thumb}
                />
            </div>
            <div className='mt-2 flex justify-between text-xs text-[#4B5563]'>
                <span>${min}</span>
                <span>${max}</span>
            </div>
        </div>
    )
}

export default function FilterSidebar({ filters, categories, brands, ratings }) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const go = (overrides) =>
        router.push(buildHref(filters, { ...overrides, page: 1 }), { scroll: false })

    const toggle = (key, value) => {
        const list = filters[key]
        go({ [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] })
    }

    return (
        <aside>
            {/* mobile toggle */}
            <button
                type='button'
                onClick={() => setOpen((p) => !p)}
                aria-expanded={open}
                className='flex w-full cursor-pointer items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#111827] lg:hidden'
            >
                Filter Products
                <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M6 9l6 6 6-6' />
                </svg>
            </button>

            <div className={`${open ? 'mt-3 block' : 'hidden'} rounded-[10px] bg-white p-4 shadow-sm lg:mt-0 lg:block`}>
                <h2 className='mb-4 hidden text-base font-semibold text-[#111827] lg:block'>Filter Products</h2>

                <Section title='Categories'>
                    <div className='max-h-56 overflow-y-auto pr-1'>
                        {categories.map(([name, count]) => (
                            <CheckRow
                                key={name}
                                label={name}
                                count={count}
                                checked={filters.category.includes(name)}
                                onChange={() => toggle('category', name)}
                            />
                        ))}
                    </div>
                </Section>

                <Section title='Price Range'>
                    <PriceRange
                        key={`${filters.min}-${filters.max}`}
                        min={filters.min}
                        max={filters.max}
                        priceMax={filters.priceMax}
                        onCommit={(min, max) => go({ min, max })}
                    />
                </Section>

                <Section title='Brand'>
                    <div className='max-h-56 overflow-y-auto pr-1'>
                        {brands.map(([name, count]) => (
                            <CheckRow
                                key={name}
                                label={name}
                                count={count}
                                checked={filters.brand.includes(name)}
                                onChange={() => toggle('brand', name)}
                            />
                        ))}
                    </div>
                </Section>

            </div>
        </aside>
    )
}