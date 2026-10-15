import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export const metadata = {
    title: 'Forgot Password | ShopHub',
    description: 'Reset your ShopHub account password.',
}

const steps = [
    'Enter the email you signed up with',
    'We send you a secure reset link',
    'Choose a new password and log back in',
]

export default function ForgotPasswordPage() {
    return (
        <section className='bg-[#F9FAFB] py-8 lg:py-16'>
            <div className='container px-2 lg:px-60'>
                <div className='mx-auto grid  overflow-hidden rounded-2xl px-5 sm:px-20 py-10 bg-white shadow-xl shadow-gray-200/60 '>
              
                    <div className='flex flex-col justify-center p-3 sm:p-10'>
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div>
        </section>
    )
}