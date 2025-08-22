'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDocsFiles } from '@/lib/github';

// 폴더명에 따른 아이콘 매핑
const folderIcons: { [key: string]: string } = {
  시작하기: '🚀',
  React: '⚛️',
  'Next.js': '🔷',
  JavaScript: '📜',
  TypeScript: '💙',
  'Node.js': '🟢',
  Git: '🔧',
  개발환경: '⚙️',
  기타: '📝',
};

// 카테고리 타입 정의
interface CategoryItem {
  name: string;
  href: string;
}

interface Category {
  name: string;
  icon: string;
  items: CategoryItem[];
}

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<string[]>(['시작하기']);

  // GitHub에서 카테고리 데이터 가져오기
  const fetchCategories = async () => {
    try {
      setLoading(true);

      // 루트 폴더 목록 가져오기
      const rootFiles = await getDocsFiles();

      // 폴더만 필터링
      const folders = rootFiles.filter(file => file.type === 'dir');

      // 각 폴더의 파일들 가져와서 카테고리 생성
      const newCategories: Category[] = [];

      for (const folder of folders) {
        try {
          const folderFiles = await getDocsFiles(folder.path);

          // .md 파일만 필터링
          const mdFiles = folderFiles.filter(
            file => file.type === 'file' && file.name.endsWith('.md')
          );

          // 카테고리 아이템 생성
          const items: CategoryItem[] = mdFiles.map(file => ({
            name: file.name.replace('.md', '').replace(/-/g, ' '), // 파일명 정리
            href: `/docs/${folder.name}/${file.name.replace('.md', '')}`,
          }));

          // 카테고리 추가
          if (items.length > 0) {
            newCategories.push({
              name: folder.name,
              icon: folderIcons[folder.name] || '📁', // 기본 아이콘
              items: items,
            });
          }
        } catch (err) {
          console.error(`폴더 ${folder.name} 처리 중 오류:`, err);
        }
      }

      setCategories(newCategories);
      setError(null);
    } catch (err) {
      console.error('카테고리 로딩 오류:', err);
      setError('문서 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  // 로딩 상태
  if (loading) {
    return (
      <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
        <div className='p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>
          <div className='space-y-4'>
            {[1, 2, 3].map(i => (
              <div key={i} className='animate-pulse'>
                <div className='h-10 bg-gray-200 rounded-lg mb-2'></div>
                <div className='ml-8 space-y-1'>
                  <div className='h-6 bg-gray-100 rounded'></div>
                  <div className='h-6 bg-gray-100 rounded'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
        <div className='p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>
          <div className='text-red-600 text-sm'>
            <p>{error}</p>
            <button
              onClick={fetchCategories}
              className='mt-2 text-blue-600 hover:text-blue-700'
            >
              다시 시도
            </button>
          </div>
        </div>
      </aside>
    );
  }

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

        {/* 새로고침 버튼 */}
        <div className='mt-8 pt-4 border-t border-gray-200'>
          <button
            onClick={fetchCategories}
            className='text-sm text-gray-500 hover:text-gray-700 flex items-center'
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
            문서 목록 새로고침
          </button>
        </div>
      </div>
    </aside>
  );
}
