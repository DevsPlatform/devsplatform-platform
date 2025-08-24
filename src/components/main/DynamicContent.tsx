// src/components/main/DynamicContent.tsx
import React from 'react';
import Link from 'next/link';

// Docs API에서 가져오는 파일의 타입 정의
interface DocsFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url?: string;
  content?: string;
}

// 이전에 작성했던 GitHub API 함수를 가져옵니다.
// 경로는 실제 프로젝트 구조에 맞게 수정해주세요.
import { getDocsFiles } from '@/lib/github';

// 커뮤니티 더미 데이터 (아직 API가 없으므로 그대로 사용)
const latestCommunity = [
  {
    title: 'Next.js 배포할 때 계속 에러가 나요 ㅠㅠ',
    link: '#',
    date: '08.24',
    likes: 2,
    comments: 5,
  },
  {
    title: '신입 개발자 자기계발 스터디',
    link: '#',
    date: '08.24',
    likes: 3,
    comments: 1,
  },
  {
    title: '4개월차 자괴감이 너무 듭니다',
    link: '#',
    date: '08.23',
    likes: 10,
    comments: 2,
  },
  {
    title: '백엔드 언어 선택 고민',
    link: '#',
    date: '08.22',
    likes: 5,
    comments: 0,
  },
  {
    title: '자사 서비스 개발 회사에 입사하는게 목표인데...',
    link: '#',
    date: '08.21',
    likes: 8,
    comments: 6,
  },
];

// 컴포넌트를 비동기 함수로 만들어 서버 컴포넌트로 작동하게 합니다.
export default async function DynamicContent() {
  // Docs API를 호출하여 실제 파일 목록을 가져옵니다.
  const docsFiles: DocsFile[] = await getDocsFiles();

  // 최신 Docs 파일 5개만 필터링하고 UI에 맞게 데이터를 변환합니다.
  const latestDocs = docsFiles
    .filter(file => file.type === 'file') // 파일만 남기고
    .slice(0, 5) // 최신 5개만 선택
    .map(file => ({
      // API 응답 데이터를 UI 데이터 형식에 맞게 변환합니다.
      title: file.name.replace(/\.md$/, ''), // 파일명에서 확장자 제거
      link: `/docs/${file.path}`, // Docs 페이지 링크
      date: 'N/A', // GitHub API 응답에 직접적인 날짜/조회수 데이터가 없어 더미값 사용
      views: 0,
      likes: 0,
    }));

  return (
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
      {/* Docs 섹션 */}
      <div className='bg-white p-6 rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-4 border-b border-gray-200 pb-2'>
          Docs
        </h2>
        <ul className='space-y-4'>
          {latestDocs.map((doc, index) => (
            <li key={index} className='flex justify-between items-center'>
              <Link href={doc.link} className='flex-1 hover:underline'>
                <span className='font-medium text-gray-800'>{doc.title}</span>
              </Link>
              <div className='flex items-center text-sm text-gray-500 space-x-2'>
                <span>{doc.date}</span>
                <span>조회 {doc.views}</span>
                <span>추천 {doc.likes}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Community 섹션 */}
      <div className='bg-white p-6 rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold mb-4 border-b border-gray-200 pb-2'>
          커뮤니티
        </h2>
        <ul className='space-y-4'>
          {latestCommunity.map((post, index) => (
            <li key={index} className='flex justify-between items-center'>
              <Link href={post.link} className='flex-1 hover:underline'>
                <span className='font-medium text-gray-800'>{post.title}</span>
              </Link>
              <div className='flex items-center text-sm text-gray-500 space-x-2'>
                <span>{post.date}</span>
                <span>추천 {post.likes}</span>
                <span>댓글 {post.comments}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
