import RegisterForm from '@/components/auth/RegisterForm'

export const metadata = {
    title: 'Create Account | ShopHub',
    description: 'Create your ShopHub account.',
}



export default function RegisterPage() {
    return (
        <section className='bg-[#F9FAFB] py-8 lg:py-16'>
            <div className='container px-4 lg:px-60'>
                <div className='mx-auto overflow-hidden rounded-2xl px-0 sm:px-20 py-5 bg-white shadow-xl shadow-gray-200/60 '>
                

                    {/* form */}
                    <div className='p-3 sm:p-10'>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    )
}