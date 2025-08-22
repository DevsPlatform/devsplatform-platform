import { Octokit } from 'octokit';

// GitHub API 클라이언트 초기화
const octokit = new Octokit({
  // Public 레포라면 토큰 없이도 되지만, 레이트 리밋 때문에 토큰 권장
  auth: process.env.GITHUB_TOKEN, // 선택사항
});

// 문서 파일 타입 정의
export interface DocsFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url?: string;
  content?: string;
}

// docs 레포에서 모든 파일 목록 가져오기
export const getDocsFiles = async (path: string = ''): Promise<DocsFile[]> => {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: 'DevsPlatform',
      repo: 'devsplatform-docs',
      path: path,
    });

    // 배열인지 확인 (디렉토리 내용)
    if (Array.isArray(response.data)) {
      return response.data.map(file => ({
        name: file.name,
        path: file.path,
        type: file.type as 'file' | 'dir',
        download_url: file.download_url || undefined,
      }));
    }

    // 단일 파일인 경우
    return [
      {
        name: response.data.name,
        path: response.data.path,
        type: response.data.type as 'file' | 'dir',
        download_url: response.data.download_url || undefined,
      },
    ];
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error(`Failed to fetch docs files: ${error}`);
  }
};

// 특정 마크다운 파일 내용 가져오기
export const getFileContent = async (path: string): Promise<string> => {
  try {
    const response = await octokit.rest.repos.getContent({
      owner: 'DevsPlatform',
      repo: 'devsplatform-docs',
      path: path,
    });

    // 파일인지 확인
    if (!Array.isArray(response.data) && response.data.type === 'file') {
      // Base64로 인코딩된 내용을 디코딩
      const content = Buffer.from(response.data.content, 'base64').toString(
        'utf-8'
      );
      return content;
    }

    throw new Error(`${path} is not a file`);
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw new Error(`Failed to fetch file content: ${error}`);
  }
};

// 디렉토리 구조를 재귀적으로 가져오기
export const getDocsTree = async (path: string = ''): Promise<DocsFile[]> => {
  const files = await getDocsFiles(path);
  const result: DocsFile[] = [];

  for (const file of files) {
    if (file.type === 'dir') {
      // 디렉토리인 경우 재귀적으로 하위 파일들 가져오기
      const subFiles = await getDocsTree(file.path);
      result.push(file, ...subFiles);
    } else {
      result.push(file);
    }
  }

  return result;
};
