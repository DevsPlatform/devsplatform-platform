// src/components/docs/DocsLayoutClientWrapper.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';

// Remixicon 토글 버튼 SVG
import { RiLayoutLeftLine } from '@remixicon/react';

// Sidebar에서 사용하는 타입 정의
interface CategoryItem {
  name: string;
  href: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  items: CategoryItem[];
}

interface DocsLayoutClientWrapperProps {
  categories: Category[];
  children: React.ReactNode;
}

export default function DocsLayoutClientWrapper({
  categories,
  children,
}: DocsLayoutClientWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='flex min-h-screen'>
      {/* 사이드바 - 열림/닫힘 상태에 따라 너비 조절 */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? 'w-[280px]' : 'w-0'}`}
      >
        <Sidebar categories={categories} />
      </div>

      {/* 메인 콘텐츠 */}
      <main className='flex-1 overflow-auto p-4 transition-all duration-300'>
        {/* 토글 버튼 */}
        <div className='sticky top-4 left-4 z-50'>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='bg-white p-2 rounded-full shadow-md text-gray-600 hover:bg-gray-100 transition-colors'
            aria-label='Toggle Sidebar'
          >
            <div
              className={`w-6 h-6 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`}
            >
              <RiLayoutLeftLine />
            </div>
          </button>
        </div>
        <div className='max-w-4xl mx-auto'>{children}</div>
      </main>
    </div>
  );
}
