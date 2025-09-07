// page.jsx
"use client"; // This component runs on the client side for interactions/animations

import React from 'react';
import Link from 'next/link';
import { UserPlusIcon, ArrowRightOnRectangleIcon, LockClosedIcon } from '@heroicons/react/24/outline'; // Icons for visual flair

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Gradients/Shapes - for a dynamic, modern feel */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-40 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>

      {/* Main Content Area */}
      <div className="relative z-10 text-center max-w-4xl mx-auto backdrop-filter backdrop-blur-md bg-gray-900/50 rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 border border-emerald-800/60 transform transition-all duration-500 ease-in-out hover:scale-105 hover:border-emerald-500/80">
        {/* Logo/Icon (Optional) */}
        <div className="flex justify-center mb-8">
          <LockClosedIcon className="h-20 w-20 text-emerald-400 animate-pulse-slow" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-fade-in-up">
          Secure Your Digital World with <span className="text-emerald-400 block sm:inline">Ease</span>
        </h1>

        {/* Tagline/Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed animate-fade-in delay-200">
          Your centralized hub for robust and intuitive user management. Streamline operations, empower teams, and enhance security.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/register" passHref legacyBehavior>
            <a className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 group border-b-4 border-emerald-800 hover:border-emerald-600">
              <UserPlusIcon className="h-6 w-6 mr-3 transition-transform group-hover:rotate-6 duration-300" />
              Get Started (Register)
            </a>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <a className="inline-flex items-center justify-center px-8 py-4 bg-gray-700 hover:bg-gray-800 text-gray-200 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 group border-b-4 border-gray-900 hover:border-gray-700">
              <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 transition-transform group-hover:translate-x-1 duration-300" />
              Login to Your Account
            </a>
          </Link>
        </div>
      </div>

      {/* Footer / Branding */}
      <footer className="relative z-10 mt-12 text-gray-500 text-sm animate-fade-in delay-800">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
