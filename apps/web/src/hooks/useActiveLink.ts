import { useRouter } from 'next/router';

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(path: string, deep = true): ReturnType {
  console.log('path: ', path);
  const { pathname, asPath } = useRouter();

  const checkPath = path.startsWith('#');
  console.log('checkPath: ', checkPath);

  const currentPath = path === '/' ? '/' : `${path}`;
  console.log('currentPath: ', currentPath);

  const normalActive =
    (!checkPath && pathname === currentPath) ||
    (!checkPath && asPath === currentPath);

  console.log('normalActive: ', normalActive);
  const deepActive =
    (!checkPath && pathname.includes(currentPath)) ||
    (!checkPath && asPath.includes(currentPath));
  console.log('deepActive: ', deepActive);

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes('http'),
  };
}
