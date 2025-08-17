'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Docs', href: '/docs' },
  { name: 'Community', href: '/community' },
  { name: 'Chat', href: '/chat' },
  { name: 'AI', href: '/ai' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* 데스크탑 네비게이션 */}
      <div className='hidden md:flex space-x-8'>
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors'
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* 모바일 햄버거 버튼 */}
      <div className='md:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-gray-700 hover:text-gray-900 focus:outline-none'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {isOpen ? (
              <path d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className='md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className='block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
