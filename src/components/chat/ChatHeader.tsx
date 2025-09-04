export default function ChatHeader() {
  return (
    <div className='border-b border-gray-200 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold text-gray-900 mr-4'>전체 채팅</h1>
          <div className='text-sm text-gray-500'>실시간으로 소통해보세요</div>
        </div>
      </div>
    </div>
  );
}
