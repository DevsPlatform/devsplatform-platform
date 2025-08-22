import Link from 'next/link';
import { getDocsFiles } from '@/lib/github';

// 폴더명에 따른 아이콘 매핑
const folderIcons: { [key: string]: string } = {
  시작하기: '🚀',
  React: '⚛️',
  'Next.js': '🔷',
  JavaScript: '📜',
  TypeScript: '💙',
  'Node.js': '🟢',
  Git: '🔧',
  개발환경: '⚙️',
  기타: '📝',
};

// 카테고리 타입 정의
interface CategoryItem {
  name: string;
  href: string;
}

interface Category {
  name: string;
  icon: string;
  items: CategoryItem[];
}

// ISR 캐싱 - 1시간마다 재생성
export const revalidate = 3600;

export default async function Sidebar() {
  try {
    // GitHub에서 카테고리 데이터 가져오기 (서버에서 실행)
    const rootFiles = await getDocsFiles();
    const folders = rootFiles.filter(file => file.type === 'dir');

    const categories: Category[] = [];

    for (const folder of folders) {
      try {
        const folderFiles = await getDocsFiles(folder.path);
        const mdFiles = folderFiles.filter(
          file => file.type === 'file' && file.name.endsWith('.md')
        );

        const items: CategoryItem[] = mdFiles.map(file => {
          const fileName = file.name.replace('.md', '');
          return {
            name: fileName.replace(/-/g, ' '),
            href: `/docs/${encodeURIComponent(folder.name)}/${encodeURIComponent(fileName)}`,
          };
        });

        if (items.length > 0) {
          categories.push({
            name: folder.name,
            icon: folderIcons[folder.name] || '📁',
            items: items,
          });
        }
      } catch (err) {
        console.error(`폴더 ${folder.name} 처리 중 오류:`, err);
      }
    }

    return (
      <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
        <div className='p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>

          <nav className='space-y-2'>
            {categories.map(category => (
              <div key={category.name}>
                {/* 카테고리 헤더 - 항상 열려있게 */}
                <div className='flex items-center px-3 py-2 text-gray-700'>
                  <span className='mr-3 text-lg'>{category.icon}</span>
                  <span className='font-medium'>{category.name}</span>
                </div>

                {/* 카테고리 아이템들 */}
                <div className='ml-8 space-y-1'>
                  {category.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className='block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* 캐시 정보 */}
          <div className='mt-8 pt-4 border-t border-gray-200'>
            <p className='text-xs text-gray-400'>
              📦 캐시된 목록 (1시간마다 업데이트)
            </p>
          </div>
        </div>
      </aside>
    );
  } catch (error) {
    console.error('카테고리 로딩 오류:', error);

    return (
      <aside className='bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0'>
        <div className='p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-6'>Docs</h2>
          <div className='text-red-600 text-sm'>
            <p>문서 목록을 불러오는데 실패했습니다.</p>
          </div>
        </div>
      </aside>
    );
  }
}
