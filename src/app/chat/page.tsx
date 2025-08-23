import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import OnlineUserList from '@/components/chat/OnlineUserList'; // 파일명 그대로!

export default function ChatPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto p-4'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <ChatHeader />

          <div className='flex h-[600px]'>
            <div className='flex-1 flex flex-col border-r border-gray-200'>
              <MessageList />
              <MessageInput /> {/* 중복 div 제거 */}
            </div>

            {/* OnlineUserList가 이미 w-64 bg-gray-50 p-4 포함하므로 중복 래핑 제거 */}
            <OnlineUserList />
          </div>
        </div>
      </div>
    </div>
  );
}
