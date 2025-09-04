// src/app/community/layout.tsx
import React from 'react';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen'>
      {/* 현재 커뮤니티 페이지는 특별한 레이아웃이 없으므로,
        children을 그대로 렌더링합니다.
        나중에 사이드바나 다른 공통 UI가 필요하면 여기에 추가하면 됩니다.
      */}
      {children}
    </div>
  );
}
