// src/components/main/MarqueeRow.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Contributor } from '@/types/contributors';

// Contributor 인터페이스 확장 (uniqueKey 포함)
interface MarqueeContributor extends Contributor {
  uniqueKey: string;
}

interface MarqueeRowProps {
  contributors: MarqueeContributor[];
  duration: number;
  direction: 'left' | 'right';
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  contributors,
  duration,
  direction,
}) => {
  return (
    <div
      className='flex-shrink-0 flex items-center justify-around'
      style={{
        animation: `${direction === 'right' ? 'scrollRight' : 'scrollLeft'} ${duration}s linear infinite`,
      }}
    >
      {contributors.map(contributor => (
        <Link
          key={contributor.uniqueKey}
          href={contributor.githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex-shrink-0 w-20 h-20 mx-4 transition-transform duration-300 hover:scale-110'
        >
          <Image
            src={contributor.imageUrl}
            alt='Contributor'
            width={80}
            height={80}
            className='rounded-full'
          />
        </Link>
      ))}
    </div>
  );
};

export default MarqueeRow;
