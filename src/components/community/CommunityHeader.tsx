// src/components/community/CommunityHeader.tsx
import React from 'react';

export default function CommunityHeader() {
  return (
    <div className='flex justify-between items-center mb-12'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold text-gray-900 mr-4'>커뮤니티</h1>
        <p className='text-gray-600'>일상부터 정보까지 나눠보세요</p>
      </div>
      <button className='bg-white text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:border-black transition-colors'>
        글쓰기
      </button>
    </div>
  );
}
