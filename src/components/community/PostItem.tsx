// src/components/community/PostItem.tsx

// 공지 게시글 타입
interface NoticePost {
  isNotice: true;
  id: 'notice'; // 공지사항은 id가 'notice'로 고정
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
}

// 일반 게시글 타입
interface RegularPost {
  isNotice: false;
  id: number; // 일반 게시글은 id가 숫자
  title: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  comments?: number;
}

// 두 타입을 합쳐서 유니온 타입으로 만듭니다.
export type Post = NoticePost | RegularPost;

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <tr
      className={
        post.isNotice
          ? 'border-b border-gray-100'
          : 'border-b border-gray-100 hover:bg-gray-50'
      }
    >
      <td className='py-3 px-4 text-center'>
        {/* 'isNotice' prop을 기준으로 렌더링을 분기합니다. */}
        {post.isNotice ? (
          <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded'>
            공지
          </span>
        ) : (
          <span className='text-gray-600'>{post.id}</span>
        )}
      </td>
      <td className='py-3 px-4'>
        <a href='#' className='text-gray-900 hover:text-blue-600 font-medium'>
          {post.title}
          {/* 'isNotice'가 false일 때만 comments를 렌더링 */}
          {!post.isNotice && post.comments && (
            <span className='text-gray-400'> [{post.comments}]</span>
          )}
        </a>
      </td>
      <td className='py-3 px-4 text-gray-600 hidden md:table-cell'>
        {post.author}
      </td>
      <td className='py-3 px-4 text-gray-600 hidden md:table-cell'>
        {post.date}
      </td>
      <td className='py-3 px-4 text-gray-600 hidden sm:table-cell text-center'>
        {post.views.toLocaleString()}
      </td>
      <td className='py-3 px-4 text-gray-600 hidden sm:table-cell text-center'>
        {post.likes.toLocaleString()}
      </td>
    </tr>
  );
}
