// src/app/docs/page.tsx
import SearchBar from '@/components/docs/SearchBar';
import ContributionGuide from '@/components/docs/ContributionGuide'; // 새로 만든 컴포넌트 임포트
import { getDocsTree } from '@/lib/github';

// DocsFile 타입 정의
interface DocsFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url?: string;
  content?: string;
}

export default async function DocsPage() {
  const docsTree: DocsFile[] = await getDocsTree();

  const allDocs = docsTree
    .filter(file => file.type === 'file' && file.name.endsWith('.md'))
    .map(file => ({
      title: file.name.replace(/\.md$/, ''),
      description: `이 문서는 ${file.name.replace(/\.md$/, '')}에 대한 내용입니다.`,
      icon: '📄',
      category: file.path.split('/')[0],
      link: `/docs/${file.path.replace(/\.md$/, '')}`,
    }));

  return (
    <div>
      {' '}
      {/* min-h-screen 제거 */}
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* 헤더 섹션 */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-6'>
            개발 공부...
          </h1>
          <p className='text-xl text-gray-600 mb-4'>
            봐야할 건 너무 많은데, 그조차도 설명 자체가 어렵다니...
          </p>
          <p className='text-lg text-gray-500 mb-12'>
            조금 더 쉽게 쉽게 이해해봅시다.
          </p>

          <SearchBar allDocs={allDocs} />
        </div>

        <ContributionGuide />
      </div>
    </div>
  );
}
