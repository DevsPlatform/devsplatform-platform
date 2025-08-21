'use client';

import { useState, useEffect } from 'react';
// SearchResult 타입 정의
interface SearchResult {
  title: string;
  description: string;
  icon: string;
  category: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = mockSearchResults.filter(
        (item: SearchResult) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
      setIsOpen(true);
    } else {
      setFilteredResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  return (
    <div className='w-full max-w-2xl mx-auto relative'>
      {/* 검색 입력창 */}
      <div className='relative'>
        {/* 회전하는 그라데이션 테두리 */}
        <div className='rotating-border'>
          <div className='relative flex items-center bg-white rounded-full h-full'>
            <div className='absolute left-4 z-10'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>

            <input
              type='text'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setIsOpen(true)}
              className='w-full pl-12 pr-6 py-4 text-lg bg-transparent focus:outline-none rounded-full text-black'
            />
          </div>
        </div>
      </div>

      {/* CSS 스타일 */}
      <style jsx>{`
        .rotating-border {
          position: relative;
          padding: 2px;
          border-radius: 50px;
          background: linear-gradient(
            45deg,
            #000,
            #333,
            #666,
            #999,
            #ccc,
            #999,
            #666,
            #333,
            #000
          );
          background-size: 200% 200%;
          animation: gradientRotate 3s ease-in-out infinite;
        }

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* 검색 결과 오버레이 */}
      {isOpen && filteredResults.length > 0 && (
        <>
          {/* 배경 클릭으로 닫기 */}
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />

          {/* 검색 결과 */}
          <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-96 overflow-y-auto'>
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className='px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                onClick={() => {
                  console.log('선택:', result.title);
                  setIsOpen(false);
                }}
              >
                <div className='flex items-start'>
                  <span className='text-lg mr-3 mt-1'>{result.icon}</span>
                  <div className='flex-1'>
                    <h4 className='font-medium text-gray-900 mb-1'>
                      {result.title}
                    </h4>
                    <p className='text-sm text-gray-600 mb-1'>
                      {result.description}
                    </p>
                    <span className='text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                      {result.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 검색어가 있지만 결과가 없을 때 */}
      {isOpen && searchQuery && filteredResults.length === 0 && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 p-4 text-center text-gray-500'>
            &ldquo;{searchQuery}&rdquo;에 대한 검색 결과가 없습니다.
          </div>
        </>
      )}
    </div>
  );
}

const mockSearchResults = [
  {
    title: 'React Hooks 완벽 가이드',
    description: 'useState, useEffect부터 커스텀 훅까지',
    icon: '⚛️',
    category: 'React',
  },
  {
    title: 'Next.js App Router',
    description: '새로운 라우팅 시스템 완전 정복',
    icon: '🔷',
    category: 'Next.js',
  },
  {
    title: 'JavaScript 비동기 처리',
    description: 'Promise, async/await 쉽게 이해하기',
    icon: '📜',
    category: 'JavaScript',
  },
  {
    title: 'TypeScript 기초',
    description: '타입으로 안전한 코드 작성하기',
    icon: '🔷',
    category: 'TypeScript',
  },
  {
    title: 'CSS Flexbox',
    description: '레이아웃의 혁신, Flexbox 마스터하기',
    icon: '🎨',
    category: 'CSS',
  },
  {
    title: 'React useState Hook',
    description: 'React의 가장 기본적인 상태 관리 훅',
    icon: '⚛️',
    category: 'React',
  },
  {
    title: 'JavaScript async/await',
    description: '비동기 처리를 동기처럼 쉽게',
    icon: '📜',
    category: 'JavaScript',
  },
];
