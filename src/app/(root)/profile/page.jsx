"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../../../firebase.config'
import { getAuthErrorMessage } from '@/lib/authErrors'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [checkingAuth, setCheckingAuth] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
            router.replace('/login')
            return
        }

        setUser(currentUser)
        setCheckingAuth(false)
    }), [router])

    async function handleSignOut() {
        setError('')
        setLoading(true)
        try {
            await signOut(auth)
            router.replace('/login')
        } catch (signOutError) {
            setError(getAuthErrorMessage(signOutError))
        } finally {
            setLoading(false)
        }
    }

    if (checkingAuth || !user) {
        return (
            <section className='bg-[#F9FAFB] px-4 py-16'>
                <div className='container flex justify-center'>
                    <p className='text-sm text-[#6B7280]'>Loading your profile...</p>
                </div>
            </section>
        )
    }

    const displayName = user.displayName || 'ShopHub customer'
    const avatarLabel = (user.displayName || user.email || 'U').trim().charAt(0).toUpperCase()

    return (
        <section className='bg-[#F9FAFB] px-4 py-10 lg:py-16'>
            <div className='container max-w-2xl'>
                <div className='overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/60'>
                    <div className='border-b border-[#E5E7EB] px-6 py-8 sm:px-10'>
                        <h1 className='text-2xl font-bold text-[#111827] sm:text-3xl'>My profile</h1>
                        <p className='mt-2 text-sm text-[#6B7280]'>Your ShopHub account details</p>
                    </div>

                    <div className='flex flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:px-10'>
                        <div
                            aria-label={user.photoURL ? `${displayName}'s profile photo` : undefined}
                            className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2563EB] bg-cover bg-center text-2xl font-semibold text-white'
                            style={user.photoURL ? { backgroundImage: `url("${user.photoURL}")` } : undefined}
                        >
                            {!user.photoURL && avatarLabel}
                        </div>
                        <div className='text-center sm:text-left'>
                            <h2 className='text-xl font-semibold text-[#111827]'>{displayName}</h2>
                            <p className='mt-1 break-all text-sm text-[#6B7280]'>{user.email}</p>
                            <p className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                user.emailVerified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                                {user.emailVerified ? 'Email verified' : 'Email not verified'}
                            </p>
                        </div>
                    </div>

                    {error && (
                        <p role='alert' className='mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600 sm:mx-10'>
                            {error}
                        </p>
                    )}

                    <div className='border-t border-[#E5E7EB] px-6 py-5 sm:px-10'>
                        <button
                            type='button'
                            onClick={handleSignOut}
                            disabled={loading}
                            className='rounded-[10px] bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70'
                        >
                            {loading ? 'Signing out...' : 'Sign out'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
