export default function OnlineUsersList() {
  return (
    <div className='w-64 bg-gray-50 p-4'>
      <div className='space-y-3'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            홍
          </div>
          <span className='text-gray-700 text-sm'>홍길동</span>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            김
          </div>
          <span className='text-gray-700 text-sm'>김철수</span>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            이
          </div>
          <span className='text-gray-700 text-sm'>이영희</span>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            박
          </div>
          <span className='text-gray-700 text-sm'>박민수</span>
        </div>

        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
            나
          </div>
          <span className='text-gray-700 text-sm font-medium'>나 (You)</span>
        </div>
      </div>
    </div>
  );
}
