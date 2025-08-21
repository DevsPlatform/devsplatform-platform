import Sidebar from '@/components/docs/Sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen'>
      {/* 사이드바 - 모바일에서는 숨김, 데스크탑에서는 고정 */}
      <div className='hidden lg:block'>
        <Sidebar />
      </div>

      {/* 메인 콘텐츠 */}
      <main className='overflow-auto'>
        {/* 모바일 햄버거 버튼 */}
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
}
