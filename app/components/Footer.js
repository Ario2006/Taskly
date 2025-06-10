import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Facebook, Instagram, Youtube} from 'lucide-react';
import { Globe } from '@/components/magicui/globe';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { Pointer } from '@/components/magicui/pointer';

const Footer = () => {
const currentYear = new Date().getFullYear();

const globeConfig = {
pointSize: 4,
globeColor: "#000000",
showAtmosphere: true,
atmosphereColor: "#e0e0e0",
atmosphereAltitude: 0.1,
emissive: "#202020",
emissiveIntensity: 0.1,
shininess: 0.9,
polygonColor: "rgba(255,255,255,0.7)",
ambientLight: "#e0e0e0",
directionalLeftLight: "#ffffff",
directionalRightLight: "#ffffff",
};

const sampleGlobeData = [
{ location: [37.7749, -122.4194], size: 0.05, color: '#F0BC36' },
{ location: [40.7128, -74.0060], size: 0.05, color: '#264A9E' },
{ location: [51.5074, 0.1278], size: 0.05, color: '#66BB44' },
{ location: [35.6895, 139.6917], size: 0.05, color: '#8CB1AA' },
{ location: [-33.8688, 151.2093], size: 0.04, color: '#3B82F6' },
];

return (
<footer className="cursor-none bg-white dark:bg-transparent pt-20 sm:pt-28 min-h-[800px]">
<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative bg-blue-500 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-purple-900/20 dark:to-black rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden mb-12 sm:mb-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="lg:w-1/2 text-center lg:text-left relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Elevate Your Project Management
          </h2>
          <p className="text-lg text-white italic mb-8">
            {"Join thousands of teams achieving more with Taskly's intuitive platform."}
          </p>
          <Link href="/signup">
            <InteractiveHoverButton className="cursor-none">Get Started Free</InteractiveHoverButton>
          </Link>
        </div>

        <div className="cursor-none absolute top--10 right-0 w-[600px] h-[600px] z-0">
          <Globe
            globeConfig={globeConfig}
            data={sampleGlobeData}
            backgroundColor="transparent"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
    </div>

    <div className="bg-black text-neutral-200 rounded-t-3xl pt-12 sm:pt-16 pb-8 px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 lg:col-span-5 mb-8 md:mb-0">
        <Link href="/" className="cursor-none mb-4 flex items-center space-x-4 font-poppins text-xl font-bold text-white transform transition-transform duration-150 hover:scale-102">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <span>Taskly</span>
        </Link>
          <p className="text-sm leading-relaxed mb-3">
            Empowering teams to plan, track, and deliver projects with clarity and efficiency.
          </p>
          <div className="mt-4">
            <h4 className="font-semibold text-neutral-200 mb-1 text-sm">Email</h4>
            <a href="mailto:support@taskly.com" className="cursor-none hover:text-blue-400 transition-colors text-sm">
              support@taskly.com
            </a>
          </div>
          <div className="mt-3">
            <h4 className="font-semibold text-neutral-200 mb-1 text-sm">Support Center</h4>
            <Link href="/support" className="cursor-none hover:text-blue-400 transition-colors text-sm">
                Visit Help & Support
            </Link>
          </div>
        </div>

        {/* Quick Links (md:col-span-2) */}
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="text-sm font-semibold text-neutral-200 tracking-wider uppercase mb-4">Quick links</h3>
          <ul className="space-y-3">
            <li><Link href="/pricing" className="hover:text-yellow-400 transition-colors">Pricing</Link></li>
            <li><Link href="/features" className="hover:text-yellow-400 transition-colors">Features</Link></li>
            <li><Link href="/integrations" className="hover:text-yellow-400 transition-colors">Integrations</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400 transition-colors">About us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact us</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <h3 className="text-sm font-semibold text-neutral-200 tracking-wider uppercase mb-4">Social</h3>
          <ul className="space-y-3">
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-500 transition-colors"><Linkedin className="w-5 h-5 mr-2" /> LinkedIn</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-500 transition-colors"><Twitter className="w-5 h-5 mr-2" /> Twitter (X)</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-500 transition-colors"><Facebook className="w-5 h-5 mr-2" /> Facebook</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-500 transition-colors"><Instagram className="w-5 h-5 mr-2" /> Instagram</a></li>
             <li><a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-500 transition-colors"><Youtube className="w-5 h-5 mr-2" /> Youtube</a></li>
          </ul>
        </div>

        {/* Legal (md:col-span-3) */}
        <div className="md:col-span-3 lg:col-span-3">
          <h3 className="text-sm font-semibold text-neutral-200 tracking-wider uppercase mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="/terms-of-service" className="hover:text-pink-400 transition-colors">Terms of service</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-pink-400 transition-colors">Privacy policy</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-pink-400 transition-colors">Cookie policy</Link></li>
            <li><Link href="/security" className="hover:text-pink-400 transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
        <p>© {currentYear} Taskly. All rights reserved.</p>
      </div>
    </div>
  </div>
  <Pointer className="fill-pink-400" />
</footer>
);
};

export default Footer;