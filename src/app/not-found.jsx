import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='relative overflow-hidden bg-[#F9FAFB] min-h-screen'>
            {/* decorative blurred blobs */}
            <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl' />
            <div className='pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl' />

            <div className='container relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center xl:px-0'>
                {/* 4 [cart] 4 */}
                <div className='flex items-center justify-center gap-2 sm:gap-4'>
                    <span className='bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-[96px] leading-none font-extrabold text-transparent sm:text-[160px] lg:text-[200px]'>
                        4
                    </span>

                    <div className='flex h-20 w-20 animate-bounce items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-800 shadow-xl shadow-blue-600/30 sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
                        <svg
                            className='h-9 w-9 text-white sm:h-14 sm:w-14 lg:h-16 lg:w-16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.8'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        >
                            <circle cx='9' cy='20' r='1.5' />
                            <circle cx='18' cy='20' r='1.5' />
                            <path d='M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L21 7H6' />
                            <path d='M10 9.5l4 4M14 9.5l-4 4' />
                        </svg>
                    </div>

                    <span className='bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-[96px] leading-none font-extrabold text-transparent sm:text-[160px] lg:text-[200px]'>
                        4
                    </span>
                </div>

                <h1 className='mt-6 text-2xl font-bold text-[#111827] sm:text-4xl'>
                    Oops! This page went out of stock
                </h1>
                <p className='mt-3 max-w-md text-base leading-6 font-normal text-[#6B7280] sm:text-lg'>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back to shopping.
                </p>

                {/* actions */}
                <div className='mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4'>
                    <Link
                        href='/'
                        className='rounded-lg bg-[#2563EB] px-6.5 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[#1D4ED8] hover:shadow-blue-600/40'
                    >
                        Back to Home
                    </Link>
                </div>

              
            </div>
        </section>
    )
}