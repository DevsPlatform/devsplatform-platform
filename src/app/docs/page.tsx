import SearchBar from '@/components/docs/SearchBar';

export default function DocsPage() {
  return (
    <div className='bg-white min-h-screen'>
      <div className='max-w-4xl mx-auto px-4 py-16'>
        {/* 헤더 섹션 */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-6'>
            개발 공부...
          </h1>
          <p className='text-xl text-gray-600 mb-4'>
            봐야할 건 너무 많은데, 그조차도 설명 자체가 어렵다니...
          </p>
          <p className='text-lg text-gray-500 mb-12'>
            조금 더 쉽게 쉽게 이해해봅시다.
          </p>

          <SearchBar />
        </div>

        {/* 기여 가이드 섹션 */}
        <div className='mt-16 bg-gray-50 rounded-xl p-8'>
          <div className='space-y-6'>
            <p className='text-gray-700 text-center'>
              이 사이트의 모든 문서는 GitHub에서 관리됩니다. <br />
              새로운 글을 작성하거나 기존 글을 수정하고 싶다면 GitHub 저장소에서
              기여해주세요.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white rounded-lg p-6 border border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900 mb-3'>
                  새 문서 작성
                </h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  어려운 공식문서나 개념을 쉽게 설명한 글을 마크다운으로
                  작성해주세요.
                </p>
                <a
                  href='https://github.com/DevsPlatform/devsplatform-docs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:text-blue-700'
                >
                  docs 저장소 →
                </a>
              </div>

              <div className='bg-white rounded-lg p-6 border border-gray-200'>
                <h3 className='text-lg font-medium text-gray-900 mb-3'>
                  기존 문서 수정
                </h3>
                <p className='text-gray-600 mb-4 text-sm'>
                  오타나 잘못된 내용을 발견했다면 언제든 수정 제안을 해주세요.
                </p>
                <a
                  href='https://github.com/DevsPlatform/devsplatform-docs/pulls'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-green-600 hover:text-green-700'
                >
                  Pull Request 보기 →
                </a>
              </div>
            </div>

            <div className='text-center pt-4'>
              <p className='text-sm text-gray-500'>
                GitHub 사용이 처음이라면{' '}
                <a href='#' className='text-blue-600 hover:text-blue-700'>
                  가이드
                </a>
                를 참고하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
