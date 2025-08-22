import { NextResponse } from 'next/server';
import { getDocsFiles, getFileContent } from '@/lib/github';

export async function GET() {
  try {
    console.log('🚀 GitHub API 테스트 시작...');

    // 1. docs 레포의 루트 파일 목록 가져오기
    console.log('📁 루트 파일 목록 가져오는 중...');
    const files = await getDocsFiles();
    console.log('✅ 파일 목록:', files);

    // 2. README.md 파일이 있으면 내용 가져오기
    const readmeFile = files.find(file => file.name === 'README.md');
    let readmeContent = null;

    if (readmeFile) {
      console.log('📄 README.md 내용 가져오는 중...');
      readmeContent = await getFileContent('README.md');
      console.log('✅ README 내용 앞부분:', readmeContent.substring(0, 100));
    }

    // 3. "시작하기" 폴더가 있는지 확인
    const startFolder = files.find(
      file => file.name === '시작하기' && file.type === 'dir'
    );
    let startFolderFiles = null;

    if (startFolder) {
      console.log('📂 시작하기 폴더 내용 가져오는 중...');
      startFolderFiles = await getDocsFiles('시작하기');
      console.log('✅ 시작하기 폴더 파일들:', startFolderFiles);
    }

    // 4. 성공 응답
    return NextResponse.json({
      success: true,
      message: 'GitHub API 연동 성공! 🎉',
      data: {
        totalFiles: files.length,
        rootFiles: files,
        readmePreview: readmeContent
          ? readmeContent.substring(0, 200) + '...'
          : 'README.md 없음',
        startFolderFiles: startFolderFiles || '시작하기 폴더 없음',
      },
    });
  } catch (error) {
    console.error('❌ GitHub API 에러:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'GitHub API 연동 실패',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
