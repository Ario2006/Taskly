"use client";
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Pointer } from '@/components/magicui/pointer';
import { MoveRight } from 'lucide-react';

const subscriptionPlansData = {
  monthly: [
    {
      id: 'taskly-starter-monthly',
      label: 'STARTER',
      labelColor: 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100',
      price: '$0',
      priceSuffix: '/month',
      description: 'Perfect for individuals or small teams just getting started.',
      features: [
        'Up to 3 active projects',
        'Unlimited tasks & checklists',
        'Basic Kanban board',
        'Team collaboration (up to 5 users)',
        'Mobile + Web access',
        'Community support',
      ],
      buttonText: 'Get Started',
      buttonLink: '#',
      bgColor: 'bg-white dark:bg-neutral-800',
      textColor: 'text-neutral-600 dark:text-neutral-300',
      priceColor: 'text-neutral-900 dark:text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white rounded-full',
      borderColor: 'border-yellow dark:border-neutral-700',
      featureIconColor: 'text-blue-500 dark:text-indigo-400',
    },
    {
      id: 'taskly-pro-monthly',
      label: 'PRO',
      labelColor: 'bg-white text-black dark:bg-white dark:text-black border-black border-1px',
      price: '$9',
      priceSuffix: '/user/month',
      description: 'For growing teams who need more power, views, and automation.',
      features: [
        'Unlimited projects & users',
        'Timeline, calendar, and list views',
        'Recurring tasks & automations',
        'File attachments & version history',
        'Advanced filters & custom fields',
        'Priority email + chat support',
      ],
      buttonText: 'Coming Soon',
      buttonLink: '#',
      isPopular: true,
      popularBannerText: 'POPULAR',
      bgColor: 'bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300',
      textColor: 'text-white',
      priceColor: 'text-white',
      buttonClass: 'bg-white hover:bg-gray-100 text-black',
      borderColor: 'border-transparent',
      featureIconColor: 'text-white',
      hrColor: 'border-white/30',
    },
    {
      id: 'taskly-business-monthly',
      label: 'BUSINESS',
      labelColor: 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100',
      title: 'Custom Pricing',
      description: 'Designed for large organizations needing enterprise-grade controls.',
      features: [
        'Advanced user roles & permissions',
        'Single sign-on (SSO)',
        'Audit logs & compliance features',
        'Dedicated success manager',
        'Custom onboarding & training',
        '24/7 premium support',
      ],
      buttonText: 'Coming Soon',
      buttonLink: '#',
      bgColor: 'bg-white dark:bg-neutral-800',
      textColor: 'text-neutral-600 dark:text-neutral-300',
      priceColor: 'text-neutral-900 dark:text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white rounded-full',
      borderColor: 'border-yellow dark:border-neutral-700',
      featureIconColor: 'text-blue-500 dark:text-indigo-400',
    },
  ],
  annually: [
    {
      id: 'taskly-starter-annual',
      label: 'STARTER ANNUAL',
      labelColor: 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100',
      price: '$0',
      priceSuffix: '/month',
      description: 'Perfect for individuals or small teams just getting started.',
      features: [
        'Up to 3 active projects',
        'Unlimited tasks & checklists',
        'Basic Kanban board',
        'Team collaboration (up to 5 users)',
        'Mobile + Web access',
        'Community support',
      ],
      buttonText: 'Get Started',
      bgColor: 'bg-white dark:bg-neutral-800',
      textColor: 'text-neutral-600 dark:text-neutral-300',
      priceColor: 'text-neutral-900 dark:text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white rounded-full',
      borderColor: 'border-yellow dark:border-neutral-700',
      featureIconColor: 'text-blue-500 dark:text-indigo-400',
    },
    {
      id: 'taskly-pro-annual',
      label: 'PRO ANNUAL',
      labelColor: 'bg-white text-black dark:bg-white dark:text-black border-black border-1px',
      price: '$7.50',
      priceSuffix: '/user/month, billed annually',
      description: 'For growing teams who need more power, views, and automation.',
      features: [
        'Unlimited projects & users',
        'Timeline, calendar, and list views',
        'Recurring tasks & automations',
        'File attachments & version history',
        'Advanced filters & custom fields',
        'Priority email + chat support',
        '2 months free (vs monthly)',
      ],
      buttonText: 'Coming Soon',
      isPopular: true,
      popularBannerText: 'POPULAR',
      bgColor: 'bg-gradient-to-br from-blue-500 via-green-400 to-yellow-300',
      textColor: 'text-white',
      priceColor: 'text-white',
      buttonClass: 'bg-white hover:bg-gray-100 text-black',
      borderColor: 'border-transparent',
      featureIconColor: 'text-white',
      hrColor: 'border-white/30',
    },
    {
      id: 'taskly-business-annual',
      label: 'BUSINESS ANNUAL',
      labelColor: 'bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100',
      title: 'Custom Pricing',
      description: 'Designed for large organizations needing enterprise-grade controls.',
      features: [
        'Advanced user roles & permissions',
        'Single sign-on (SSO)',
        'Audit logs & compliance features',
        'Dedicated success manager',
        'Custom onboarding & training',
        '24/7 premium support',
        'Annual discount applied',
      ],
      buttonText: 'Coming Soon',
      bgColor: 'bg-white dark:bg-neutral-800',
      textColor: 'text-neutral-600 dark:text-neutral-300',
      priceColor: 'text-neutral-900 dark:text-white',
      buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white rounded-full',
      borderColor: 'border-yellow dark:border-neutral-700',
      featureIconColor: 'text-blue-500 dark:text-indigo-400',
    },
  ],
};

const PricingCard = ({ plan }) => {
  const {
    label, labelColor, price, priceSuffix, title, description, features,
    buttonText, buttonLink, isPopular, popularBannerText, bgColor, textColor,
    priceColor, buttonClass, borderColor, featureIconColor, hrColor
  } = plan;

  const cardBaseClasses = `
    rounded-2xl shadow-xl p-6 sm:p-8 
    flex flex-col 
    transition-all duration-300 ease-in-out 
    relative overflow-hidden
    h-full
  `;
  
  const popularClasses = isPopular ? 'lg:scale-105 lg:z-10' : '';

  return (
    <div className={`${bgColor} ${borderColor} ${cardBaseClasses} ${popularClasses}`}>
      {/* Popular Banner */}
      {isPopular && popularBannerText && (
        <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden">
          <div className="absolute top-[22px] right-[-30px] w-[150px] 
                          transform rotate-45 
                          bg-white text-center text-neutral-900 
                          text-xs font-semibold py-1 shadow-md">
            {popularBannerText}
          </div>
        </div>
      )}

      {/* Plan Label */}
      <div className={`
        inline-block px-4 py-1.5 
        ${labelColor} 
        rounded-full text-xs font-bold 
        uppercase tracking-wider 
        mb-5 self-start
      `}>
        {label}
      </div>

      {/* Pricing */}
      {price && (
        <div className={`text-4xl sm:text-5xl font-extrabold ${priceColor} mb-2`}>
          {price}
          {priceSuffix && (
            <span className={`text-base font-normal ml-1 ${textColor}`}>
              {priceSuffix}
            </span>
          )}
        </div>
      )}
      
      {/* Custom Title (for Business plan) */}
      {title && (
        <div className={`text-3xl sm:text-4xl font-bold ${priceColor} mb-3`}>
          {title}
        </div>
      )}

      {/* Description */}
      <p className={`text-sm ${textColor} mb-6 min-h-[48px] sm:min-h-[56px]`}>
        {description}
      </p>

      {/* Divider */}
      <hr className={`
        ${hrColor || (isPopular ? 'border-neutral-700' : 'border-neutral-200 dark:border-neutral-700')} 
        mb-6
      `} />

      {/* Features List */}
      <ul className={`space-y-3 mb-8 text-sm ${textColor} flex-grow`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2
              className={`
                w-5 h-5 ${featureIconColor} 
                mr-2.5 flex-shrink-0 mt-0.5
              `}
              aria-hidden="true"
            />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <a
        href={buttonLink}
        className={`
          block w-full text-center 
          ${buttonClass} 
          font-semibold py-3.5 px-6 
          rounded-full shadow-md 
          transition-all duration-150 ease-in-out 
          hover:scale-[1.02] hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-offset-2 
          ${isPopular ? 'focus:ring-white' : 'focus:ring-blue-500'}
          mt-auto
        `}
      >
        {buttonText}
      <MoveRight color={buttonClass.includes('bg-blue-500') ? '#ffffff' : '#000000'} strokeWidth={1.25} className="inline mx-2"/>
      </a>
    </div>
  );
};

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const currentPlans = subscriptionPlansData[billingCycle] || [];

  return (
    <div className="w-[98vw] mx-auto rounded-2xl bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-500 dark:text-white mb-4">
              Simple pricing for every team size.
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {"Choose the plan that's right for you. No hidden fees. No long-term contracts for subscriptions."}
            </p>
          </div>

          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-full shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors
                  ${billingCycle === 'monthly'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow'
                    : 'text-black dark:text-neutral-300 dark:hover:text-white'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors
                  ${billingCycle === 'annually'
                    ? 'bg-white dark:bg-neutral-700 text-black dark:text-white shadow'
                    : 'text-black dark:text-neutral-300 dark:hover:text-white'
                  }`}
              >
                Annually <span className="text-xs opacity-80 hidden sm:inline">(Save ~15%)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pb-12">
            {currentPlans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
      <Pointer className="fill-green-600" />
    </div>
  );
}

export default Pricing;