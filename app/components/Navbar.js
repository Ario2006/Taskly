"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  
  // Check for logged in user
  useEffect(() => {
    const checkUser = () => {
      const currentUser = localStorage.getItem('taskly_current_user')
      if (currentUser) {
        setUser(JSON.parse(currentUser))
      } else {
        setUser(null)
      }
    }
    
    // Check on mount
    checkUser()
    
    // Listen for storage changes (for when user logs in/out in another tab)
    window.addEventListener('storage', checkUser)
    
    // Check when navigating
    window.addEventListener('focus', checkUser)
    
    return () => {
      window.removeEventListener('storage', checkUser)
      window.removeEventListener('focus', checkUser)
    }
  }, [])
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('taskly_current_user')
    setUser(null)
    closeMenu()
    router.push('/')
  }

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90vw] z-50 bg-white/40 backdrop-blur-md border-b border-white/20 rounded-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href={user ? "/dashboard" : "/"} className="cursor-none flex items-center space-x-4 font-poppins text-xl font-bold text-black transform transition-transform duration-150 hover:scale-110">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span>Taskly</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {user ? (
              // Logged in state
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              // Logged out state
              <>
                <Link href="/login" className="cursor-none mr-3 px-4 py-2 rounded text-blue-800 hover:text-black transform transition-transform duration-150">
                  Login
                </Link>
                <Link href="/signup">
                  <InteractiveHoverButton className="cursor-none border-1 border-black">
                    Get Started
                  </InteractiveHoverButton>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none bg-white/50 rounded-full"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-6 py-8">
          {/* Menu Handle */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-8" />
          
          <nav className="flex flex-col items-center space-y-4">
            {user ? (
              // Logged in mobile menu
              <>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={`https://avatar.vercel.sh/${user.email}`}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="text-lg font-medium text-gray-700 hover:text-black py-3 px-6 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-lg font-medium text-red-600 hover:text-red-700 py-3 px-6 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              // Logged out mobile menu
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="text-lg font-medium text-blue-800 hover:text-black py-3 px-6 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                >
                  <InteractiveHoverButton className="cursor-none border-1 border-black py-3">
                    Get Started
                  </InteractiveHoverButton>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar