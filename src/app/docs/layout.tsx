import React from 'react';
import Sidebar from '@/components/docs/Sidebar';
import { getDocsFiles } from '@/lib/github';
import { Category, CategoryItem } from '@/types/docs'; // 타입을 한 곳에서 임포트

// Remix Icon에서 사용할 올바른 아이콘 이름을 임포트합니다.
import {
  RiPlayCircleFill,
  RiReactjsFill,
  RiNextjsFill,
  RiJavascriptFill,
  RiGitCommitFill,
  RiFileTextFill,
  RiComputerFill,
  RiHtml5Fill,
  RiCss3Fill,
  RiTailwindCssFill,
  RiNodejsFill,
} from '@remixicon/react';

// 폴더명에 따른 아이콘 매핑
const folderIcons: { [key: string]: React.ReactNode } = {
  시작하기: <RiPlayCircleFill />,
  React: <RiReactjsFill />,
  'Next.js': <RiNextjsFill />,
  JavaScript: <RiJavascriptFill />,
  TypeScript: <RiNodejsFill />, // Remixicon에 TypeScript 전용 아이콘이 없어 Node.js로 대체
  Html: <RiHtml5Fill />,
  Css: <RiCss3Fill />,
  Tailwind: <RiTailwindCssFill />,
  Git: <RiGitCommitFill />,
  'Node.js': <RiNodejsFill />,
  개발환경: <RiComputerFill />,
  기타: <RiFileTextFill />,
};

// ISR 캐싱 - 1시간마다 재생성
export const revalidate = 3600;

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const rootFiles = await getDocsFiles();
    const folders = rootFiles.filter(file => file.type === 'dir');

    const folderContents = await Promise.all(
      folders.map(async folder => {
        const files = await getDocsFiles(folder.path);
        const mdFiles = files.filter(
          file => file.type === 'file' && file.name.endsWith('.md')
        );

        const items: CategoryItem[] = mdFiles.map(file => {
          const fileName = file.name.replace('.md', '');
          return {
            name: fileName.replace(/-/g, ' '),
            href: `/docs/${encodeURIComponent(folder.name)}/${encodeURIComponent(fileName)}`,
          };
        });

        return {
          name: folder.name,
          icon: folderIcons[folder.name] || <RiFileTextFill />,
          items: items,
        };
      })
    );

    const categories: Category[] = folderContents.filter(
      category => category.items.length > 0
    );

    return (
      <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen'>
        <div className='hidden lg:block'>
          <Sidebar categories={categories} />
        </div>

        <main className='overflow-auto'>
          <div className='lg:hidden p-4 border-b border-gray-200 bg-white sticky top-0 z-10'>
            <button className='text-gray-600 hover:text-gray-900'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
          {children}
        </main>
      </div>
    );
  } catch (error) {
    console.error('카테고리 로딩 오류:', error);

    return (
      <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen'>
        <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
          <div className='p-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>
            <div className='text-red-600 text-sm'>
              <p>문서 목록을 불러오는데 실패했습니다.</p>
            </div>
          </div>
        </aside>
        <main className='overflow-auto'>{children}</main>
      </div>
    );
  }
}
