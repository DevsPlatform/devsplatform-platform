// src/app/community/page.tsx
import React from 'react';
import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityTabs from '@/components/community/CommunityTabs';
import PostList from '@/components/community/PostList';
import Pagination from '@/components/community/Pagination';
import { Post } from '@/components/community/PostItem'; // Post 타입을 가져와서 사용

// 데이터 타입을 명시적으로 지정하여 오류를 방지합니다.
const posts: Post[] = [
  {
    isNotice: true,
    id: 'notice',
    title: '사이트 이용 규칙 및 안내사항',
    author: '관리자',
    date: '08.18',
    views: 1234,
    likes: 45,
  },
  {
    isNotice: false,
    id: 2658,
    title: 'React Hooks 사용법에 대해 질문이 있어요',
    author: '김개발',
    date: '08.14',
    views: 94,
    likes: 0,
    comments: 3,
  },
  {
    isNotice: false,
    id: 2647,
    title: 'Next.js 배포할 때 계속 에러가 나요 ㅠㅠ',
    author: '박코딩',
    date: '08.09',
    views: 62,
    likes: 2,
    comments: 5,
  },
  {
    isNotice: false,
    id: 2646,
    title: '자바스크립트 배열 메소드 정리해봤어요',
    author: '이개발',
    date: '08.04',
    views: 51,
    likes: 8,
  },
];

export default function CommunityPage() {
  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <CommunityHeader />
        <CommunityTabs />
        <PostList posts={posts} />
        <Pagination />
      </div>
    </div>
  );
}
