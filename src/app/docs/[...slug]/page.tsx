import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getFileContent, getDocsFiles } from '@/lib/github';
import 'highlight.js/styles/github.css'; // 코드 하이라이팅 스타일

// ISR 캐싱 설정 - 1시간마다 재생성
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // await 추가!
  const title = slug[slug.length - 1] || 'Docs';

  return {
    title: `${title} | DevsPlatform Docs`,
    description: `DevsPlatform ${title} 문서`,
  };
}

// 정적 경로 생성 (빌드 시 미리 생성할 페이지들)
export async function generateStaticParams() {
  try {
    // 모든 폴더와 파일 경로 수집
    const paths: { slug: string[] }[] = [];

    // 루트 폴더들 가져오기
    const rootFiles = await getDocsFiles();
    const folders = rootFiles.filter(file => file.type === 'dir');

    for (const folder of folders) {
      try {
        const folderFiles = await getDocsFiles(folder.path);
        const mdFiles = folderFiles.filter(
          file => file.type === 'file' && file.name.endsWith('.md')
        );

        for (const file of mdFiles) {
          const fileName = file.name.replace('.md', '');
          paths.push({
            slug: [folder.name, fileName],
          });
        }
      } catch (err) {
        console.error(`폴더 ${folder.name} 처리 중 오류:`, err);
      }
    }

    return paths;
  } catch (error) {
    console.error('정적 경로 생성 오류:', error);
    return [];
  }
}

export default async function DocsDetailPage({ params }: PageProps) {
  const { slug } = await params; // await 추가!

  // URL에서 파일 경로 구성 (한글 경로 디코딩)
  const folderName = decodeURIComponent(slug[0]);
  const fileName = decodeURIComponent(slug[1]);
  const filePath = `${folderName}/${fileName}.md`;

  console.log('요청된 파일 경로:', filePath); // 디버깅용

  try {
    // GitHub에서 마크다운 파일 내용 가져오기
    const content = await getFileContent(filePath);

    // 파일명을 사람이 읽기 좋게 변환
    const displayTitle = fileName.replace(/-/g, ' ');

    return (
      <div className='flex min-h-screen bg-gray-50'>
        {/* 메인 콘텐츠 */}
        <main className='flex-1 max-w-4xl mx-auto px-6 py-8'>
          {/* 브레드크럼 */}
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

          {/* 문서 헤더 */}
          <header className='mb-8 pb-6 border-b border-gray-200'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              {displayTitle}
            </h1>
            <p className='text-gray-600'>{folderName} 카테고리의 문서</p>
          </header>

          {/* 마크다운 콘텐츠 */}
          <article className='prose prose-lg max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                // 제목 스타일링
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

                // 단락 스타일링
                p: ({ children }) => (
                  <p className='text-gray-700 leading-relaxed mb-4'>
                    {children}
                  </p>
                ),

                // 목록 스타일링
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

                // 링크 스타일링
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

                // 코드 블록 스타일링
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

                // 인용구 스타일링
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

          {/* 하단 네비게이션 */}
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
    notFound(); // 404 페이지로 이동
  }
}
