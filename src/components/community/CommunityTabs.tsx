// src/components/community/CommunityTabs.tsx
import React from 'react';

export default function CommunityTabs() {
  return (
    <div className='mb-6'>
      <div className='border-b border-gray-200'>
        <nav className='flex space-x-8'>
          <button className='py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium'>
            전체글
          </button>
          <button className='py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700'>
            공지
          </button>
        </nav>
      </div>
    </div>
  );
}
