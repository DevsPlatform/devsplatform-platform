'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './Footer';

const pathsToHideFooter = ['/docs'];

export default function FooterHider() {
  const pathname = usePathname();
  const shouldHideFooter = pathsToHideFooter.includes(pathname);

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
