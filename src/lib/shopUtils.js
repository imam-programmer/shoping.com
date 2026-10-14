export const PER_PAGE = 12
export const PRICE_MAX = 1000

// builds /shop?category=..&brand=..&min=..&max=..&rating=..&sort=..&page=..
export function buildHref(filters, overrides = {}) {
    const f = { ...filters, ...overrides }
    const p = new URLSearchParams()
    if (f.category?.length) p.set('category', f.category.join(','))
    if (f.brand?.length) p.set('brand', f.brand.join(','))
    if (f.min > 0) p.set('min', String(f.min))
    if (f.max < PRICE_MAX) p.set('max', String(f.max))
    if (f.rating) p.set('rating', String(f.rating))
    if (f.sort && f.sort !== 'popularity') p.set('sort', f.sort)
    if (f.page > 1) p.set('page', String(f.page))
    const qs = p.toString()
    return qs ? `/shop?${qs}` : '/shop'
}