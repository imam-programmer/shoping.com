"use client"

import { useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import { getAuthErrorMessage } from '@/lib/authErrors'

const inputBase =
    'w-full rounded-[10px] border bg-white px-3.5 py-3 text-sm text-[#111827] outline-none transition placeholder:text-[#ADAEBC] focus:ring-4'
const inputOk = 'border-[#d1d5db] focus:border-[#2563EB] focus:ring-blue-600/10'
const inputBad = 'border-red-400 focus:border-red-500 focus:ring-red-500/10'

const EyeIcon = ({ off }) =>
    off ? (
        <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A9.8 9.8 0 0 1 12 5c5 0 8.5 4 9.5 7a11.6 11.6 0 0 1-2.7 4.2M6.6 6.6C4.5 8 3 10.3 2.5 12c1 3 4.5 7 9.5 7 1.6 0 3-.4 4.2-1' />
        </svg>
    ) : (
        <svg className='h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M2.5 12C3.5 9 7 5 12 5s8.5 4 9.5 7c-1 3-4.5 7-9.5 7s-8.5-4-9.5-7z' />
            <circle cx='12' cy='12' r='3' />
        </svg>
    )

// 0 to 4
function getStrength(pw) {
    let score = 0
    if (pw.length >= 8) score++
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
    if (/\d/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
}

const strengthMeta = [
    { label: 'Too weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-blue-500' },
    { label: 'Strong', color: 'bg-green-500' },
]

function validate(form) {
    const errors = {}
    if (form.name.trim().length < 2) errors.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Please enter a valid email address.'
    if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.'
    if (form.confirm !== form.password) errors.confirm = 'Passwords do not match.'
    if (!form.terms) errors.terms = 'You must accept the terms to continue.'
    return errors
}

export default function RegisterForm() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [verificationEmail, setVerificationEmail] = useState('')

    const strength = getStrength(form.password)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
        if (serverError) setServerError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const found = validate(form)
        setErrors(found)
        if (Object.keys(found).length) return

        setLoading(true)
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                form.email.trim(),
                form.password,
            )
            let profileUpdateError
            try {
                await updateProfile(user, { displayName: form.name.trim() })
            } catch (error) {
                profileUpdateError = error
            }

            try {
                await sendEmailVerification(user)
                setVerificationEmail(user.email || form.email.trim())
                if (profileUpdateError) {
                    setServerError(`Your account was created and a verification email was sent, but we could not save your name. ${getAuthErrorMessage(profileUpdateError)}`)
                }
            } catch (error) {
                setServerError(`Your account was created, but we could not send the verification email. Please log in to request another one. ${getAuthErrorMessage(error)}`)
            } finally {
                await signOut(auth)
            }
        } catch (err) {
            setServerError(getAuthErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    const fieldError = (key) =>
        errors[key] && <p className='mt-1.5 text-xs text-red-600'>{errors[key]}</p>

    if (verificationEmail) {
        return (
            <div className='text-center'>
                <h1 className='text-2xl font-bold text-[#111827] sm:text-3xl'>Verify your email</h1>
                <p className='mt-4 text-sm leading-6 text-[#6B7280]'>
                    We sent a verification link to <span className='font-medium text-[#374151]'>{verificationEmail}</span>.
                    Verify your email before logging in.
                </p>
                {serverError && (
                    <p role='alert' className='mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-left text-sm text-amber-800'>
                        {serverError}
                    </p>
                )}
                <Link
                    href='/login'
                    className='mt-6 inline-flex w-full items-center justify-center rounded-[10px] bg-[#2563EB] px-6 py-3.5 text-base font-semibold text-white hover:bg-[#1D4ED8]'
                >
                    Continue to login
                </Link>
            </div>
        )
    }

    return (
        <div>
            {/* mobile logo (the promo panel is hidden below lg) */}
            <h1 className='text-2xl font-bold text-[#111827] sm:text-3xl text-center'>Create account</h1>
            <form onSubmit={handleSubmit} noValidate className='mt-8 flex flex-col gap-5'>
                {/* name */}
                <div>
                    <label htmlFor='name' className='mb-1.5 block text-sm font-medium text-[#374151]'>
                        Full name
                    </label>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        autoComplete='name'
                        placeholder='John Doe'
                        value={form.name}
                        onChange={handleChange}
                        aria-invalid={!!errors.name}
                        className={`${inputBase} ${errors.name ? inputBad : inputOk}`}
                    />
                    {fieldError('name')}
                </div>

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
                        placeholder='you@example.com'
                        value={form.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        className={`${inputBase} ${errors.email ? inputBad : inputOk}`}
                    />
                    {fieldError('email')}
                </div>

                {/* password */}
                <div>
                    <label htmlFor='password' className='mb-1.5 block text-sm font-medium text-[#374151]'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            autoComplete='new-password'
                            placeholder='At least 8 characters'
                            value={form.password}
                            onChange={handleChange}
                            aria-invalid={!!errors.password}
                            className={`${inputBase} pr-11 ${errors.password ? inputBad : inputOk}`}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            className='absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-[#9CA3AF] hover:text-[#374151]'
                        >
                            <EyeIcon off={showPassword} />
                        </button>
                    </div>
                    {fieldError('password')}

                    {/* strength meter */}
                    {form.password && (
                        <div className='mt-2.5'>
                            <div className='flex gap-1.5'>
                                {[1, 2, 3, 4].map((n) => (
                                    <span
                                        key={n}
                                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                                            n <= strength ? strengthMeta[strength].color : 'bg-[#E5E7EB]'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className='mt-1.5 text-xs text-[#6B7280]'>
                                Strength: <span className='font-medium text-[#374151]'>{strengthMeta[strength].label}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* confirm password */}
                <div>
                    <label htmlFor='confirm' className='mb-1.5 block text-sm font-medium text-[#374151]'>
                        Confirm password
                    </label>
                    <input
                        id='confirm'
                        name='confirm'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='new-password'
                        placeholder='Re-enter your password'
                        value={form.confirm}
                        onChange={handleChange}
                        aria-invalid={!!errors.confirm}
                        className={`${inputBase} ${errors.confirm ? inputBad : inputOk}`}
                    />
                    {fieldError('confirm')}
                </div>

                {/* terms */}
                <div>
                    <label className='flex cursor-pointer items-start gap-2 text-sm text-[#4B5563]'>
                        <input
                            type='checkbox'
                            name='terms'
                            checked={form.terms}
                            onChange={handleChange}
                            className='mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-[#2563EB]'
                        />
                        <span>
                            I agree to the{' '}
                            <Link href='/terms' className='font-medium text-[#2563EB] hover:underline'>
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href='/privacy' className='font-medium text-[#2563EB] hover:underline'>
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>
                    {fieldError('terms')}
                </div>

                {/* server error */}
                {serverError && (
                    <p role='alert' className='rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600'>
                        {serverError}
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
                    {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            {/* divider */}
            <div className='my-6 flex items-center gap-3'>
                <span className='h-px flex-1 bg-[#E5E7EB]' />
                <span className='text-xs text-[#9CA3AF]'>or sign up with</span>
                <span className='h-px flex-1 bg-[#E5E7EB]' />
            </div>

            <p className='mt-8 text-center text-sm text-[#6B7280]'>
                Already have an account?{' '}
                <Link href='/login' className='font-semibold text-[#2563EB] hover:underline'>
                    Log in
                </Link>
            </p>
        </div>
    )
}