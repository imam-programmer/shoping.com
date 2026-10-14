const Star = ({ className }) => (
    <svg viewBox='0 0 20 20' fill='currentColor' className={className}>
        <path d='M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z' />
    </svg>
)

const Stars = ({ rating, size = 'h-3 w-3' }) => (
    <div className='relative inline-flex' aria-label={`${rating} out of 5`}>
        <div className='flex text-[#D1D5DB]'>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`${size} shrink-0`} />
            ))}
        </div>
        <div
            className='absolute inset-0 flex overflow-hidden text-[#FBBF24]'
            style={{ width: `${(rating / 5) * 100}%` }}
        >
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`${size} shrink-0`} />
            ))}
        </div>
    </div>
)

export default Stars