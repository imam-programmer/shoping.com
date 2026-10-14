import Image from 'next/image'
import Link from 'next/link'
import Stars from './Stars'

const ProductCard = ({ item }) => (
    <div className='flex h-full flex-col rounded-[10px] border border-[#F3F4F6] bg-white p-3 shadow-sm sm:p-4'>
        <Link href={`/product/${item.id}`} className='relative block aspect-4/3 overflow-hidden'>
            <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes='(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 50vw'
                className='object-contain transition-transform duration-300 hover:scale-105'
            />
        </Link>

        <div className='mt-3 flex flex-1 flex-col'>
            <Link href={`/product/${item.id}`}>
                <h3 className='truncate text-sm font-medium text-[#111827]'>{item.title}</h3>
            </Link>

            <div className='mt-1 flex items-center gap-1.5'>
                <Stars rating={item.rating} />
                <span className='text-[10px] text-[#6B7280]'>({item.reviews?.length ?? 0})</span>
            </div>

            <div className='mt-auto flex items-center justify-between gap-2 pt-3'>
                <span className='text-base font-bold text-[#111827] sm:text-lg'>
                    ${item.price.toFixed(2)}
                </span>
                <button
                    type='button'
                    aria-label={`Add ${item.title} to cart`}
                    className='flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md bg-[#2563EB] text-white transition-colors hover:bg-[#1D4ED8]'
                >
                    <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <circle cx='9' cy='20' r='1.5' />
                        <circle cx='18' cy='20' r='1.5' />
                        <path d='M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6' />
                    </svg>
                </button>
            </div>
        </div>
    </div>
)

export default ProductCard