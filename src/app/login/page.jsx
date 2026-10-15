import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
    title: 'Login | ShopHub',
    description: 'Log in to your ShopHub account.',
}

const perks = [
    'Track your orders in real time',
    'Save items to your wishlist',
    'Get exclusive member-only deals',
]

export default function LoginPage() {
    return (
        <section className='bg-[#F9FAFB] py-8 lg:py-16'>
            <div className='container px-4 lg:px-60'>
                <div className='mx-auto grid  overflow-hidden rounded-2xl px-5 sm:px-20 py-10 bg-white shadow-xl shadow-gray-200/60 '>
                        <LoginForm />
                </div>
            </div>
        </section>
    )
}