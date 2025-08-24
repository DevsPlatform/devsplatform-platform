import React from 'react';

export interface CategoryItem {
  name: string;
  href: string;
}

export interface Category {
  name: string;
  icon: React.ReactNode;
  items: CategoryItem[];
}
