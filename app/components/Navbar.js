import React from 'react'
import Image from 'next/image'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90vw] z-50 bg-white/40 backdrop-blur-md border-b border-white/20 rounded-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="cursor-none flex items-center space-x-4 font-poppins text-xl font-bold text-black transform transition-transform duration-150 hover:scale-110">
          <Image src="/logo.svg" alt="Logo" width={28} height={28} />
          <span>Taskly</span>
        </Link>
        <div>
          <Link href="/login" className="cursor-none mr-3 px-4 py-2 rounded text-blue-800 hover:text-black transform transition-transform duration-150">Login</Link>
          <Link href="/signup"><InteractiveHoverButton className="cursor-none border-1 border-black">Get Started</InteractiveHoverButton></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
