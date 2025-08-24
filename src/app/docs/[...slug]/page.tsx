import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import { getFileContent, getDocsTree } from '@/lib/github';
import 'highlight.js/styles/github.css';

// GitHub API 타입 정의 (author 필드를 사용하도록 수정)
interface Commit {
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// ISR 캐싱 설정 - 1시간마다 재생성
export const revalidate = 3600;

// 메타데이터 생성 - params를 await로 처리
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params; // 이 줄 추가!
  const title = resolvedParams.slug[resolvedParams.slug.length - 1] || 'Docs';

  return {
    title: `${title} | DevsPlatform Docs`,
    description: `DevsPlatform ${title} 문서`,
  };
}

// 정적 경로 생성 (빌드 시 미리 생성할 페이지들)
export async function generateStaticParams() {
  try {
    const docsTree = await getDocsTree();
    return docsTree.map(file => ({
      slug: file.path.replace(/\.md$/, '').split('/'),
    }));
  } catch (error) {
    console.error('정적 경로 생성 오류:', error);
    return [];
  }
}

export default async function DocsDetailPage({ params }: PageProps) {
  const resolvedParams = await params; // 이 줄 추가!
  const folderName = decodeURIComponent(resolvedParams.slug[0]);
  const fileName = decodeURIComponent(resolvedParams.slug[1]);
  const filePath = `${folderName}/${fileName}.md`;

  try {
    const [content, commitData] = await Promise.all([
      getFileContent(filePath),
      fetch(
        `https://api.github.com/repos/DevsPlatform/devsplatform-docs/commits?path=${filePath}&per_page=1`,
        {
          next: { revalidate: 3600 },
        }
      ).then(res => res.json()),
    ]);

    const latestCommit: Commit = commitData?.[0];

    const displayTitle = fileName.replace(/-/g, ' ');

    return (
      <div className='flex min-h-screen bg-gray-50'>
        <main className='flex-1 max-w-4xl mx-auto px-6 py-8'>
          <nav className='mb-8'>
            <div className='flex items-center text-sm text-gray-600'>
              <Link href='/docs' className='hover:text-gray-900'>
                Docs
              </Link>
              <span className='mx-2'>/</span>
              <span className='text-gray-400'>{folderName}</span>
              <span className='mx-2'>/</span>
              <span className='text-gray-900 font-medium'>{displayTitle}</span>
            </div>
          </nav>
          <header className='mb-4 pb-6 border-b border-gray-200'>
            <div className='flex justify-between items-center mb-2'>
              <h1 className='text-4xl font-bold text-gray-900'>
                {displayTitle}
              </h1>
              {latestCommit && (
                <div className='flex items-center space-x-2 text-sm text-gray-500'>
                  <span>기여자:</span>
                  <Link
                    href={latestCommit.author.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-2 hover:underline'
                  >
                    <Image
                      src={latestCommit.author.avatar_url}
                      alt={latestCommit.author.login}
                      width={24}
                      height={24}
                      className='rounded-full'
                    />
                    <span>{latestCommit.author.login}</span>
                  </Link>
                </div>
              )}
            </div>
            <p className='text-gray-600'>{folderName} 카테고리의 문서</p>
          </header>
          <article className='prose prose-lg max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h1 className='text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0'>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className='text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2'>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className='text-xl font-medium text-gray-800 mt-6 mb-3'>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className='list-disc list-inside mb-4 space-y-1 text-gray-700'>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className='list-decimal list-inside mb-4 space-y-1 text-gray-700'>
                    {children}
                  </ol>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className='text-blue-600 hover:text-blue-700 underline'
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={
                      href?.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className='bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono'>
                        {children}
                      </code>
                    );
                  }
                  return <code className={className}>{children}</code>;
                },
                blockquote: ({ children }) => (
                  <blockquote className='border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 bg-blue-50 py-2'>
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </article>
          <footer className='mt-12 pt-8 border-t border-gray-200'>
            <div className='flex justify-between items-center'>
              <div className='text-sm text-gray-500'>
                문서가 도움이 되셨나요?
                <a
                  href={`https://github.com/DevsPlatform/devsplatform-docs/edit/main/${filePath}`}
                  className='ml-1 text-blue-600 hover:text-blue-700'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub에서 편집하기
                </a>
              </div>
              <div className='text-sm text-gray-500'>
                마지막 업데이트: 방금 전
              </div>
            </div>
          </footer>
        </main>
      </div>
    );
  } catch (error) {
    console.error('문서 로딩 오류:', error);
    notFound();
  }
}
