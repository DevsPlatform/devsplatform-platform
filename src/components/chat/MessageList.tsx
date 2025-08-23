export default function MessageList() {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {/* 홍길동 메시지 */}
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
            안녕하세요! 처음 와봤는데 여기서 개발 관련 이야기 나누나요?
          </p>
        </div>
      </div>

      {/* 김철수 메시지 */}
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

      {/* 이영희 메시지 */}
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
  );
}
