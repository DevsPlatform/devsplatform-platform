export default function Footer() {
  return (
    <footer className='bg-gray-50 border-t border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* 프로젝트 정보 */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              DevsPlatform
            </h3>
            <p className='text-gray-600 text-sm'>
              비전공자를 위한 개발자 학습 플랫폼
            </p>
          </div>

          {/* 링크들 */}
          <div>
            <h4 className='text-md font-medium text-gray-900 mb-4'>서비스</h4>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li>
                <a href='/docs' className='hover:text-gray-900'>
                  Docs
                </a>
              </li>
              <li>
                <a href='/community' className='hover:text-gray-900'>
                  Community
                </a>
              </li>
              <li>
                <a href='/chat' className='hover:text-gray-900'>
                  Chat
                </a>
              </li>
              <li>
                <a href='/ai' className='hover:text-gray-900'>
                  AI Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* GitHub */}
          <div>
            <h4 className='text-md font-medium text-gray-900 mb-4'>오픈소스</h4>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li>
                <a
                  href='https://github.com/DevsPlatform'
                  className='hover:text-gray-900'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-gray-900'>
                  기여하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 border-t border-gray-200'>
          <p className='text-center text-sm text-gray-500'>
            © 2025 DevsPlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
