// src/components/community/PostList.tsx
import React from 'react';
import PostItem from './PostItem';
import { Post } from './PostItem'; // Post 타입을 가져옵니다.

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className='border border-gray-200 overflow-hidden'>
      <table className='w-full'>
        <thead className='border-b border-gray-200'>
          <tr>
            <th className='text-left py-3 px-4 font-medium text-gray-700 w-16'>
              번호
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700'>
              제목
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700 hidden md:table-cell w-24'>
              글쓴이
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700 hidden md:table-cell w-20'>
              작성일
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700 hidden sm:table-cell w-16'>
              조회
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700 hidden sm:table-cell w-16'>
              추천
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            // 유니온 타입의 'isNotice'를 기준으로 key를 다르게 설정
            <PostItem key={post.isNotice ? 'notice' : post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
