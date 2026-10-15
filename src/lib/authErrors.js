const authErrorMessages = {
    'auth/email-already-in-use': 'An account with this email already exists. Please log in instead.',
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/user-disabled': 'This account has been disabled. Please contact support.',
    'auth/user-not-found': 'No account was found with this email address.',
    'auth/weak-password': 'Please choose a stronger password.',
    'auth/popup-closed-by-user': 'The sign-in window was closed before completing sign-in.',
    'auth/popup-blocked': 'Your browser blocked the sign-in window. Please allow popups and try again.',
    'auth/cancelled-popup-request': 'Another sign-in window is already open.',
}

export function getAuthErrorMessage(error) {
    return authErrorMessages[error?.code] || 'Authentication failed. Please try again.'
}
