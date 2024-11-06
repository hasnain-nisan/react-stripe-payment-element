import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add your login logic here
        console.log('Login attempted with:', { email, password })
        // For demonstration, let's set an error if the fields are empty
        if (!email || !password) {
            setError('Please fill in all fields')
        } else {
            setError('')
            // Proceed with login
        }
    }

    return (
        <div className="container h-screen flex items-center justify-center">
            <div className="max-w-2xl mx-auto p-6 my-3 bg-blue-50 rounded-lg shadow-md">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
                    <p className="text-gray-600 mt-2">
                        Please enter your details to sign in
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                        </label>
                        <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}

                    <div>
                        <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                        Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login