import { Contributor } from '@/types/contributors';

export const githubUsernames: string[] = [
  'Jay-klmnop',
  'jngmnj',
  'devsplatform',
  'idubusomuch',
  'yeontae519',
  'kyukyu300',
  'HyeonchanLim',
  'han-nun0107',
  'quartzs2',
  'L1m3Kun',
  'yongarframe',
  'soyeon1351',
  'devjaesung',
  'ella6010',
];

export const fetchContributors = async (): Promise<Contributor[]> => {
  const uniqueUsers = Array.from(new Set(githubUsernames));

  const contributorsData = await Promise.all(
    uniqueUsers.map(async username => {
      const res = await fetch(`https://api.github.com/users/${username}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        console.error(`Failed to fetch GitHub user: ${username}`);
        return {
          githubUrl: '#',
          imageUrl: 'https://via.placeholder.com/80?text=?',
          username,
        };
      }
      const user = await res.json();
      return {
        githubUrl: user.html_url,
        imageUrl: user.avatar_url,
        username: user.login,
      };
    })
  );

  return contributorsData;
};

// 무한 스크롤을 위해 데이터를 여러 번 복제하는 함수
export const repeatData = (
  data: Contributor[],
  count: number
): (Contributor & { uniqueKey: string })[] => {
  let repeated: (Contributor & { uniqueKey: string })[] = [];
  for (let i = 0; i < count; i++) {
    const keyedData = data.map(item => ({
      ...item,
      uniqueKey: `${item.username}-${i}`,
    }));
    repeated = [...repeated, ...keyedData];
  }
  return repeated;
};
