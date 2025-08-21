'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  {
    name: '시작하기',
    icon: '🚀',
    items: [
      { name: '소개', href: '/docs/intro' },
      { name: '설치 가이드', href: '/docs/installation' },
    ],
  },
  {
    name: 'React',
    icon: '⚛️',
    items: [
      { name: 'React 기초', href: '/docs/react/basics' },
      { name: 'State & Props', href: '/docs/react/state-props' },
      { name: 'Hooks', href: '/docs/react/hooks' },
      { name: 'Context API', href: '/docs/react/context' },
    ],
  },
  {
    name: 'Next.js',
    icon: '🔷',
    items: [
      { name: 'Next.js 소개', href: '/docs/nextjs/intro' },
      { name: 'App Router', href: '/docs/nextjs/app-router' },
      { name: '라우팅', href: '/docs/nextjs/routing' },
      { name: '서버 컴포넌트', href: '/docs/nextjs/server-components' },
    ],
  },
  {
    name: 'JavaScript',
    icon: '📜',
    items: [
      { name: 'JS 기초', href: '/docs/javascript/basics' },
      { name: '비동기 프로그래밍', href: '/docs/javascript/async' },
      { name: 'ES6+ 문법', href: '/docs/javascript/es6' },
    ],
  },
];

export default function Sidebar() {
  const [openCategories, setOpenCategories] = useState<string[]>(['React']);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>

        <nav className='space-y-2'>
          {categories.map(category => (
            <div key={category.name}>
              <button
                onClick={() => toggleCategory(category.name)}
                className='flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <div className='flex items-center'>
                  <span className='mr-3 text-lg'>{category.icon}</span>
                  <span className='font-medium'>{category.name}</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openCategories.includes(category.name) ? 'rotate-90' : ''
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>

              {openCategories.includes(category.name) && (
                <div className='ml-8 mt-1 space-y-1'>
                  {category.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
