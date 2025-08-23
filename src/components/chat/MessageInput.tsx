'use client';

import { useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('메시지 전송:', message);
      setMessage('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex space-x-3'>
        {/* SearchBar 스타일의 입력창 */}
        <div className='flex-1 relative'>
          <div className='rotating-border'>
            <div className='relative flex items-center bg-white rounded-full h-full'>
              <input
                type='text'
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='메시지를 입력하세요...'
                className='w-full px-6 py-3 text-base bg-transparent focus:outline-none rounded-full text-black'
              />
            </div>
          </div>
        </div>

        {/* Community 스타일의 버튼 */}
        <button
          type='submit'
          className='bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-3xl  hover:border-black transition-colors font-medium'
        >
          전송
        </button>
      </form>

      {/* CSS 스타일 */}
      <style jsx>{`
        .rotating-border {
          position: relative;
          padding: 2px;
          border-radius: 50px;
          background: linear-gradient(
            45deg,
            #000,
            #333,
            #666,
            #999,
            #ccc,
            #999,
            #666,
            #333,
            #000
          );
          background-size: 200% 200%;
          animation: gradientRotate 3s ease-in-out infinite;
        }

        @keyframes gradientRotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
