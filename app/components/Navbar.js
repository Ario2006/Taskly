"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import Link from 'next/link'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
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

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90vw] z-50 bg-white/40 backdrop-blur-md border-b border-white/20 rounded-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link href="/" className="cursor-none flex items-center space-x-4 font-poppins text-xl font-bold text-black transform transition-transform duration-150 hover:scale-110">
            <Image src="/logo.svg" alt="Logo" width={28} height={28} />
            <span>Taskly</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <Link href="/login" className="cursor-none mr-3 px-4 py-2 rounded text-blue-800 hover:text-black transform transition-transform duration-150">
              Login
            </Link>
            <Link href="/signup">
              <InteractiveHoverButton className="cursor-none border-1 border-black">
                Get Started
              </InteractiveHoverButton>
            </Link>
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
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar