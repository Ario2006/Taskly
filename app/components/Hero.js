import React from 'react'
import { Pointer } from "@/components/magicui/pointer";
import { AuroraText } from '@/components/magicui/aurora-text';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { MoveRight } from 'lucide-react';

function Hero() {
  return (
  <>
    <div className="h-[90vh] w-full bg-[radial-gradient(closest-side_at_center,_#d0d0d0,_white)] flex items-center justify-center">
        <div className="text-center space-y-6">
          <AnimatedGradientText className="text-sm font-medium border-1 rounded-xl px-6 py-1 border-blue-300">
            Coming Soon
          </AnimatedGradientText>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight mt-6">
            <AuroraText>Taskly</AuroraText>
          </h1>
          <p className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight -mt-2 sm:-mt-3 md:-mt-4">
            Your Projects, Organized.<br/>Your Team, Empowered.
          </p>
          <p className="mt-10 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            All-in-one project management that brings clarity, collaboration, and control—no matter the size of your team.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <div className="relative">
              <button
                className="cursor-none w-fit px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                <span>Try for Free</span>
                <MoveRight color="#ffffff" strokeWidth={1.25} className="inline mx-2"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    <Pointer className="fill-green-600" />
    </>
  )
}

export default Hero
