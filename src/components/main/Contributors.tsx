// src/components/main/Contributors.tsx
import React from 'react';
import MarqueeRow from './MarqueeRow';
import { fetchContributors, repeatData } from '@/lib/data/contributors';

// CSS Keyframe 애니메이션 정의
const marqueeAnimation = `
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;

// 메인 컴포넌트 (서버 컴포넌트)
export default async function Contributors() {
  const contributors = await fetchContributors();
  const repeatedContributors = repeatData(contributors, 2);

  return (
    <div className='bg-white py-16 px-4 text-center overflow-hidden'>
      <style>{marqueeAnimation}</style>

      <h2 className='text-3xl font-bold mb-3 text-gray-900'>
        당신의 지식을 공유해주세요
      </h2>
      <p className='text-lg text-gray-600 mb-12'>우리는 같이 성장해나갑니다</p>

      <div className='flex flex-col space-y-8'>
        <div className='flex justify-center w-full'>
          <MarqueeRow
            contributors={repeatedContributors}
            duration={60}
            direction='left'
          />
        </div>

        <div className='flex justify-center w-full'>
          <MarqueeRow
            contributors={repeatedContributors}
            duration={70}
            direction='right'
          />
        </div>

        <div className='flex justify-center w-full'>
          <MarqueeRow
            contributors={repeatedContributors}
            duration={80}
            direction='left'
          />
        </div>
      </div>
    </div>
  );
}
