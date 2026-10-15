"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import { getAuthErrorMessage } from '@/lib/authErrors'

const inputClass =
    'w-full rounded-[10px] border border-[#d1d5db] bg-white px-3.5 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#ADAEBC] focus:border-[#2563EB] focus:ring-4 focus:ring-blue-600/10'

export default function LoginForm() {
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        if (error) setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            setError('Please enter a valid email address.')
            return
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.')
            return
        }

        setLoading(true)
        try {
            const { user } = await signInWithEmailAndPassword(auth, form.email.trim(), form.password)
            const usesEmailPassword = user.providerData.some((provider) => provider.providerId === 'password')
            if (usesEmailPassword && !user.emailVerified) {
                let verificationMessage = 'Please verify your email before logging in.'
                try {
                    await sendEmailVerification(user)
                    verificationMessage += ' We sent you a new verification email.'
                } catch (verificationError) {
                    verificationMessage += ` We could not send another email: ${getAuthErrorMessage(verificationError)}`
                }
                await signOut(auth)
                setError(verificationMessage)
                return
            }
            router.replace('/profile')
        } catch (err) {
            setError(getAuthErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setError('')
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
            router.replace('/profile')
        } catch (err) {
            setError(getAuthErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* mobile logo (the promo panel is hidden below lg) */}


            <h1 className='text-2xl font-bold text-[#111827] sm:text-3xl text-center'>Log in</h1>
            <form onSubmit={handleSubmit} noValidate className='mt-8 flex flex-col gap-5'>
                {/* email */}
                <div>
                    <label htmlFor='email' className='mb-1.5 block text-sm font-medium text-[#374151]'>
                        Email
                    </label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        placeholder='your@gmail.com'
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>

                {/* password */}
                <div>
                    <div className='mb-1.5 flex items-center justify-between'>
                        <label htmlFor='password' className='text-sm font-medium text-[#374151]'>
                            Password
                        </label>
                        <Link href='/forgot-password' className='text-sm font-medium text-[#2563EB] hover:underline'>
                            Forgot password?
                        </Link>
                    </div>
                    <div className='relative'>
                        <input
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='current-password'
                            placeholder='Enter your password'
                            value={form.password}
                            onChange={handleChange}
                            className={`${inputClass} pr-11`}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className='absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-[#9CA3AF] hover:text-[#374151]'
                        >
                            {showPassword ? (
                                <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A9.8 9.8 0 0 1 12 5c5 0 8.5 4 9.5 7a11.6 11.6 0 0 1-2.7 4.2M6.6 6.6C4.5 8 3 10.3 2.5 12c1 3 4.5 7 9.5 7 1.6 0 3-.4 4.2-1' />
                                </svg>
                            ) : (
                                <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M2.5 12C3.5 9 7 5 12 5s8.5 4 9.5 7c-1 3-4.5 7-9.5 7s-8.5-4-9.5-7z' />
                                    <circle cx='12' cy='12' r='3' />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* remember me */}
                <label className='flex cursor-pointer items-center gap-2 text-sm text-[#4B5563]'>
                    <input
                        type='checkbox'
                        name='remember'
                        checked={form.remember}
                        onChange={handleChange}
                        className='h-4 w-4 cursor-pointer rounded accent-[#2563EB]'
                    />
                    Remember me
                </label>

                {/* error */}
                {error && (
                    <p role='alert' className='rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600'>
                        {error}
                    </p>
                )}

                {/* submit */}
                <button
                    type='submit'
                    disabled={loading}
                    className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70'
                >
                    {loading && (
                        <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeOpacity='0.3' strokeWidth='4' />
                            <path d='M22 12a10 10 0 0 0-10-10' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
                        </svg>
                    )}
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>

            {/* divider */}
            <div className='my-6 flex items-center gap-3'>
                <span className='h-px flex-1 bg-[#E5E7EB]' />
                <span className='text-xs text-[#9CA3AF]'>or continue with</span>
                <span className='h-px flex-1 bg-[#E5E7EB]' />
            </div>

            {/* social */}
            <button
                type='button'
                onClick={handleGoogleSignIn}
                disabled={loading}
                className='flex w-full cursor-pointer items-center justify-center gap-3 rounded-[10px] border border-[#d1d5db] bg-white px-6 py-3 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB] hover:text-[#2563EB]'
            >
                <svg className='h-5 w-5' viewBox='0 0 24 24'>
                    <path fill='#4285F4' d='M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z' />
                    <path fill='#34A853' d='M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6-4.5H2.4v2.8A11 11 0 0 0 12 23z' />
                    <path fill='#FBBC05' d='M6 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.4a11 11 0 0 0 0 9.8L6 14.1z' />
                    <path fill='#EA4335' d='M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2.4 7.1L6 9.9c.8-2.6 3.2-4.5 6-4.5z' />
                </svg>
                Google
            </button>

            <p className='mt-8 text-center text-sm text-[#6B7280]'>
                Don&apos;t have an account?{' '}
                <Link href='/register' className='font-semibold text-[#2563EB] hover:underline'>
                    Sign up
                </Link>
            </p>
        </div>
    )
}