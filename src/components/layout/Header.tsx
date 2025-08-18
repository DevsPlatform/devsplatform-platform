import Navigation from './Navigation';

export default function Header() {
  return (
    <header className='bg-white shadow-sm border-b border-gray-200 relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* 로고 */}
          <div className='flex-shrink-0'>
            <h1 className='text-xl font-bold text-gray-900'>DevsPlatform</h1>
          </div>

          {/* 네비게이션 */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}
