// src/components/main/PostListItem.tsx
import React from 'react';
import Link from 'next/link';
// 필요한 타입들을 DynamicContent.tsx에서 임포트해야 합니다.
// 하지만 편의상 여기에 임시로 정의합니다.
interface DocsPost {
  title: string;
  link: string;
  contributor: string;
}

interface CommunityPost {
  title: string;
  link: string;
  date: string;
  likes: number;
  comments: number;
}

interface PostListItemProps {
  post: DocsPost | CommunityPost;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <li className='flex justify-between items-center'>
      <Link href={post.link} className='flex-1 hover:underline'>
        <span className='font-medium text-gray-800'>{post.title}</span>
      </Link>
      <div className='flex items-center text-sm text-gray-500 space-x-2'>
        {'contributor' in post && <span>기여자: {post.contributor}</span>}
        {'comments' in post && <span>댓글 {post.comments}</span>}
      </div>
    </li>
  );
}
