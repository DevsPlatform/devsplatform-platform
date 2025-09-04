// src/app/page.tsx
import React from 'react';
import DynamicContent from '@/components/main/DynamicContent';
import Contributors from '@/components/main/Contributors';

export default function MainPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Contributors />
      <DynamicContent />
    </div>
  );
}
