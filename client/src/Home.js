import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-6 my-3 bg-blue-50 rounded-lg shadow-md">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
                <p className="text-gray-600 mt-2">
                    Please enter your details to sign in
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <Link
                        to={'/login'}
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Sign in
                    </Link>
                </div>
                <div>
                    <Link
                        to={'/serviceAndBilling'}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    Onboarding
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home