// src/components/community/Pagination.tsx
import React from 'react';

export default function Pagination() {
  return (
    <div className='flex justify-center mt-6'>
      <div className='flex space-x-2'>
        <button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>
          이전
        </button>
        <button className='px-3 py-1 bg-blue-600 text-white rounded'>1</button>
        <button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>
          2
        </button>
        <button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>
          3
        </button>
        <button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>
          다음
        </button>
      </div>
    </div>
  );
}
