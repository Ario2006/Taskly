"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  // Check for logged in user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMenu();
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
                    alt={user.user_metadata?.name || user.email}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.user_metadata?.name || user.email}</span>
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
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">Login</Link>
                <Link href="/signup" className="text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar