import React from 'react';
import Image from 'next/image';
import { Marquee } from "@/components/magicui/marquee";
import { Pointer } from '@/components/magicui/pointer';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';

const brandsData = [
  { name: "Google", src: "/Google Icon.svg", alt: "Google Logo" },
  { name: "Microsoft", src: "/Microsoft Icon.svg", alt: "Microsoft Logo" },
  { name: "Amazon", src: "/Amazon Icon.svg", alt: "Amazon Logo" },
  { name: "Facebook", src: "/Facebook Icon.svg", alt: "Facebook Logo" },
  { name: "Apple", src: "/Apple Logo Icon.svg", alt: "Apple Logo" },
  { name: "Netflix", src: "/Netflix Icon.svg", alt: "Netflix Logo" },
  { name: "Tesla", src: "/Tesla Icon.svg", alt: "Tesla Logo" },
  { name: "Shopify", src: "/Shopify Icon.svg", alt: "Shopify Logo" },
  { name: "Salesforce", src: "/Salesforce Icon.svg", alt: "Salesforce Logo" },
  { name: "Spotify", src: "/Spotify Icon.svg", alt: "Spotify Logo" },
  { name: "Airbnb", src: "/Airbnb Icon.svg", alt: "Airbnb Logo" },
];

const numBrands = brandsData.length;
const firstRowBrands = brandsData.slice(0, Math.ceil(numBrands / 2));
const secondRowBrands = brandsData.slice(Math.ceil(numBrands / 2));


const BrandLogo = ({ src, alt = '', name }) => {
  return (
    <div className="relative flex h-20 w-[180px] items-center justify-center px-6 py-2 md:h-24 md:px-8">
      <Image
        src={src}
        alt={alt || name}
        title={name}
        width={160}
        height={96}
        className="max-h-full w-auto max-w-[160px] object-contain 
                   opacity-60 grayscale transition-all duration-300 ease-in-out 
                   hover:opacity-100 hover:grayscale-0 
                   dark:opacity-70 dark:hover:opacity-100"
      />
    </div>
  );
};

const Brands = () => {
  return (
    <section className="bg-white py-16 md:py-24 dark:bg-neutral-950">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider">
          <AnimatedGradientText>Trusted By The Best</AnimatedGradientText>
        </h2>
        <p className="mb-12 text-3xl tracking-tight text-black dark:text-neutral-100 md:text-3xl md:font-medium">
          Powering innovation at leading companies
        </p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s] [--gap:3rem] whitespace-nowrap">
          {firstRowBrands.map((brand, index) => (
            <BrandLogo key={`${brand.name}-${index}-first`} {...brand} />
          ))}
        </Marquee>

        {secondRowBrands.length > 0 && (
          <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:3rem] whitespace-nowrap mt-4 md:mt-6">
            {secondRowBrands.map((brand, index) => (
              <BrandLogo key={`${brand.name}-${index}-second`} {...brand} />
            ))}
          </Marquee>
        )}

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-white to-transparent dark:from-black md:w-1/6"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-white to-transparent dark:from-black md:w-1/6"></div>
      </div>
      <Pointer className="fill-blue-600" />
    </section>
  );
};

export default Brands;