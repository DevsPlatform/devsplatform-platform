import React from 'react';
import Link from 'next/link';

export default function ContributionGuide() {
  return (
    <div className='mt-16 p-8 bg-gray-50 rounded-xl text-center'>
      <h3 className='text-xl font-bold text-gray-900 mb-4'>
        당신의 지식을 기여해주세요
      </h3>
      <p className='text-gray-700 text-base mb-2'>
        모든 문서는 GitHub에서 관리되고 있습니다. <br />
        새로운 글을 작성하거나 글을 수정하고 싶다면 당신의 지식을 기여해주세요.
      </p>
      <p className='text-gray-600 text-sm'>
        <Link
          href='/docs/시작하기/소개'
          className='text-blue-600 hover:text-blue-700 underline'
        >
          자세한 설명은 소개 페이지에서 알려드릴게요.
        </Link>
      </p>
    </div>
  );
}
