// src/components/main/DynamicContent.tsx
import React from 'react';
import Link from 'next/link';
import { getDocsTree } from '@/lib/github';
import PostListItem from './PostListItem';

// Docs 포스트 타입 정의
interface DocsPost {
  title: string;
  link: string;
  contributor: string;
}

// 커뮤니티 더미 데이터 (아직 API가 없으므로 그대로 사용)
interface CommunityPost {
  title: string;
  link: string;
  date: string;
  likes: number;
  comments: number;
}
const latestCommunity: CommunityPost[] = [
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

// 재사용 가능한 목록 컴포넌트
interface PostListProps {
  title: string;
  posts: (DocsPost | CommunityPost)[];
  viewMoreHref: string;
}

const PostList = ({ title, posts, viewMoreHref }: PostListProps) => (
  <div className='bg-white p-6 rounded-xl shadow-md flex flex-col h-full'>
    <div className='flex justify-between items-center mb-4 border-b border-gray-200 pb-2'>
      <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
      <Link
        href={viewMoreHref}
        className='text-sm text-gray-500 hover:text-blue-600 transition-colors'
      >
        더 보기 &gt;
      </Link>
    </div>
    <ul className='space-y-4 flex-1'>
      {posts.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </ul>
  </div>
);

export default async function DynamicContent() {
  const docsFiles = await getDocsTree();

  const latestDocs: DocsPost[] = await Promise.all(
    docsFiles
      .filter(
        file =>
          file.type === 'file' &&
          file.name.endsWith('.md') &&
          file.path.includes('/')
      )
      .slice(0, 5)
      .map(async file => {
        const res = await fetch(
          `https://api.github.com/repos/DevsPlatform/devsplatform-docs/commits?path=${file.path}&per_page=1`,
          {
            next: { revalidate: 3600 },
          }
        );
        const commitData = await res.json();
        const latestCommit = commitData?.[0];

        return {
          title: file.name.replace(/\.md$/, ''),
          link: `/docs/${file.path.replace(/\.md$/, '')}`,
          contributor: latestCommit?.author?.login || '알 수 없음',
        };
      })
  );

  return (
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
      <PostList title='Docs' posts={latestDocs} viewMoreHref='/docs' />
      <PostList
        title='커뮤니티'
        posts={latestCommunity}
        viewMoreHref='/community'
      />
    </div>
  );
}
