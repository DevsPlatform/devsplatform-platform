import ChatHeader from '../../components/chat/ChatHeader';

export default function ChatPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto p-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          {/* 채팅 헤더 */}
          <ChatHeader />

          {/* 메인 채팅 영역 */}
          <div className='flex h-[600px]'>
            {/* 좌측: 채팅 메시지 영역 */}
            <div className='flex-1 flex flex-col border-r border-gray-200'>
              {/* 채팅 메시지 리스트 */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {/* 임시 메시지들 */}
                <div className='flex items-start space-x-3'>
                  <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    홍
                  </div>
                  <div>
                    <div className='flex items-baseline space-x-2'>
                      <span className='font-medium text-gray-900'>홍길동</span>
                      <span className='text-xs text-gray-500'>10:30</span>
                    </div>
                    <p className='text-gray-700 mt-1'>
                      안녕하세요! 처음 와봤는데 여기서 개발 관련 이야기
                      나누나요?
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    김
                  </div>
                  <div>
                    <div className='flex items-baseline space-x-2'>
                      <span className='font-medium text-gray-900'>김철수</span>
                      <span className='text-xs text-gray-500'>10:32</span>
                    </div>
                    <p className='text-gray-700 mt-1'>
                      네! 맞아요. React 관련 질문도 많이 나와요 😊
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    이
                  </div>
                  <div>
                    <div className='flex items-baseline space-x-2'>
                      <span className='font-medium text-gray-900'>이영희</span>
                      <span className='text-xs text-gray-500'>10:35</span>
                    </div>
                    <p className='text-gray-700 mt-1'>
                      저도 Next.js 배우고 있는데, 여기서 많은 도움 받고 있어요!
                    </p>
                  </div>
                </div>
              </div>

              {/* 메시지 입력 영역 */}
              <div className='border-t border-gray-200 p-4'>
                <div className='flex space-x-3'>
                  <input
                    type='text'
                    placeholder='메시지를 입력하세요...'
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                  />
                  <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'>
                    전송
                  </button>
                </div>
              </div>
            </div>

            {/* 우측: 온라인 사용자 목록 */}
            <div className='w-64 bg-gray-50 p-4'>
              <div className='mb-4'>
                <h3 className='font-semibold text-gray-900 mb-2'>
                  🟢 온라인 (5명)
                </h3>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    홍
                  </div>
                  <span className='text-gray-700 text-sm'>홍길동</span>
                  <div className='w-2 h-2 bg-green-500 rounded-full ml-auto'></div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    김
                  </div>
                  <span className='text-gray-700 text-sm'>김철수</span>
                  <div className='w-2 h-2 bg-green-500 rounded-full ml-auto'></div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    이
                  </div>
                  <span className='text-gray-700 text-sm'>이영희</span>
                  <div className='w-2 h-2 bg-green-500 rounded-full ml-auto'></div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    박
                  </div>
                  <span className='text-gray-700 text-sm'>박민수</span>
                  <div className='w-2 h-2 bg-green-500 rounded-full ml-auto'></div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                    나
                  </div>
                  <span className='text-gray-700 text-sm font-medium'>
                    나 (You)
                  </span>
                  <div className='w-2 h-2 bg-green-500 rounded-full ml-auto'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
