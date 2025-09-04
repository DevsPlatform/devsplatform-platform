// src/components/docs/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Category } from '@/types/docs'; // 타입을 한 곳에서 임포트

interface SidebarProps {
  categories: Category[];
}

export default function Sidebar({ categories }: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    categories.reduce(
      (acc, category) => ({ ...acc, [category.name]: true }),
      {}
    )
  );

  const toggleCategory = (name: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className='bg-white border-r border-gray-200 overflow-y-auto sticky top-0'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>

        <nav className='space-y-2'>
          {categories.map(category => (
            <div key={category.name}>
              <div
                className='flex items-center px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-50 rounded-md transition-colors'
                onClick={() => toggleCategory(category.name)}
              >
                <span className='mr-3 text-lg'>{category.icon}</span>
                <span className='font-medium flex-1'>{category.name}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                    openCategories[category.name] ? 'rotate-90' : ''
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
              </div>

              {openCategories[category.name] && (
                <div className='ml-8 space-y-1 mt-1 transition-all duration-300'>
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
