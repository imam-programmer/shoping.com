"use client"

"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import { getAuthErrorMessage } from '@/lib/authErrors'

const COOLDOWN = 30

const inputBase =
    'w-full rounded-[10px] border bg-white px-3.5 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#ADAEBC] focus:ring-4'
const inputOk = 'border-[#d1d5db] focus:border-[#2563EB] focus:ring-blue-600/10'
const inputBad = 'border-red-400 focus:border-red-500 focus:ring-red-500/10'

const Spinner = () => (
    <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24' fill='none'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeOpacity='0.3' strokeWidth='4' />
        <path d='M22 12a10 10 0 0 0-10-10' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
    </svg>
)

const BackToLogin = () => (
    <Link
        href='/login'
        className='mt-8 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline'
    >
        <svg className='h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path d='M19 12H5M11 6l-6 6 6 6' />
        </svg>
        Back to login
    </Link>
)

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    // resend countdown
    useEffect(() => {
        if (cooldown <= 0) return
        const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [cooldown])

    const sendLink = async () => {
        setLoading(true)
        setError('')
        try {
            await sendPasswordResetEmail(auth, email.trim())
            setSent(true)
            setCooldown(COOLDOWN)
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setSent(true)
                setCooldown(COOLDOWN)
            } else {
                setError(getAuthErrorMessage(err))
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.')
            return
        }
        sendLink()
    }

    /* ---------- success state ---------- */
    if (sent) {
        return (
            <div className='text-center lg:text-left'>
                <div className='mx-auto flex h-16   w-16 items-center justify-center rounded-full bg-green-50 lg:mx-0'>
                    <svg className='h-8 w-8 text-green-600 text-center' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                        <rect x='3' y='5' width='18' height='14' rx='2' />
                        <path d='M3 7l9 6 9-6' />
                    </svg>
                </div>

                <h1 className='mt-6 text-2xl font-bold text-[#111827] sm:text-3xl'>Check your email</h1>
                <p className='mt-2 text-sm leading-6 text-[#6B7280]'>
                    If an account exists for <span className='font-medium text-[#374151]'>{email}</span>,
                    we&apos;ve sent a link to reset your password. It may take a minute to arrive.
                </p>

                {error && (
                    <p role='alert' className='mt-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-left text-sm text-red-600'>
                        {error}
                    </p>
                )}

                <div className='mt-8 flex flex-col gap-3'>
                    <button
                        type='button'
                        onClick={sendLink}
                        disabled={loading || cooldown > 0}
                        className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-[#d1d5db] bg-white px-6 py-3 text-sm font-semibold text-[#374151] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[#d1d5db] disabled:hover:text-[#374151]'
                    >
                        {loading && <Spinner />}
                        {loading ? 'Sending...' : cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend email'}
                    </button>

                    <button
                        type='button'
                        onClick={() => {
                            setSent(false)
                            setCooldown(0)
                        }}
                        className='cursor-pointer text-sm font-medium text-[#6B7280] hover:text-[#2563EB]'
                    >
                        Use a different email
                    </button>
                </div>

                <div className='flex justify-center lg:justify-start'>
                    <BackToLogin />
                </div>
            </div>
        )
    }

    /* ---------- form state ---------- */
    return (
        <div>
            {/* mobile logo (the promo panel is hidden below lg) */}
<div className='flex  justify-center'>

            <div className='flex h-12 w-12 items-center  justify-center rounded-full bg-blue-50
            '>
                <svg className='h-6 w-6 text-[#2563EB] ' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
                    <rect x='4' y='11' width='16' height='10' rx='2' />
                    <path d='M8 11V7a4 4 0 0 1 8 0v4' />
                </svg>
            </div>
</div>

            <h1 className='mt-5 text-2xl font-bold text-[#111827] sm:text-3xl text-center'>Forgot password?</h1>

            <form onSubmit={handleSubmit} noValidate className='mt-8 flex flex-col gap-5'>
                <div>
                    <label htmlFor='email' className='mb-1.5 block text-sm font-medium text-[#374151]'>
                        Email
                    </label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        placeholder='you@example.com'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            if (error) setError('')
                        }}
                        aria-invalid={!!error}
                        aria-describedby={error ? 'email-error' : undefined}
                        className={`${inputBase} ${error ? inputBad : inputOk}`}
                    />
                    {error && (
                        <p id='email-error' role='alert' className='mt-1.5 text-xs text-red-600'>
                            {error}
                        </p>
                    )}
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70'
                >
                    {loading && <Spinner />}
                    {loading ? 'Sending link...' : 'Send reset link'}
                </button>
            </form>

            <div className='flex justify-center'>
                <BackToLogin />
            </div>
        </div>
    )
}