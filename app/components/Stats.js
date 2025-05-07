"use client";
import React from 'react';
import { Star } from 'lucide-react';
import { Pointer } from '@/components/magicui/pointer';
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { AuroraText } from '@/components/magicui/aurora-text';

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

const StatItem = ({ icon = null, renderAvatars = null, value, description, isLast = false }) => {
  return (
    <div className={`flex flex-col items-center text-center px-6 py-8 
                     ${!isLast ? 'md:border-r md:border-white' : ''}
                     border-b border-white md:border-b-0 last:border-b-0`}
    >
      <div className="flex items-center mb-4 h-16">
        {renderAvatars && <div className="mr-3">{renderAvatars}</div>}
        {icon && <div className="mr-3">{icon}</div>}
        <span className="text-5xl font-bold text-gray-800">{value}</span>
      </div>
      <p className="text-gray-800 text-sm leading-relaxed">{description}</p>
    </div>
  );
};


const Stats = () => {
  const stats = [
    {
      renderAvatars: <AvatarCircles numPeople={99} avatarUrls={avatars} />,
      value: '120K+',
      description: 'Thousands trust Taskly for a reason. Join teams and discover the benefits!',
    },
    {
      icon: <Star className="w-10 h-10 text-yellow-400" fill="currentColor" />,
      value: '4.8',
      description: 'Positive ratings by Taskly users around the world! Check the reviews here.',
    },
    {
      value: '100%',
      description: 'User satisfaction with Taskly, reflecting improved project outcomes and collaboration.',
    },
  ];

  return (
    <section className="relative bg-green-500 py-12 md:py-15 rounded-2xl mx-4">
      <div className="absolute top-0 left-0 bg-white text-xl font-bold px-5 py-3 rounded-br-xl shadow-md">
        <AuroraText>Why choose us?</AuroraText>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.value}
              renderAvatars={stat.renderAvatars}
              icon={stat.icon}
              value={stat.value}
              description={stat.description}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>
      <Pointer className="fill-yellow-400" />
    </section>
  );
};

export default Stats;