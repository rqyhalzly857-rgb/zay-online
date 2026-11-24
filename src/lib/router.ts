import { useEffect, useState } from 'react';

export type Page =
  | 'home'
  | 'about'
  | 'services'
  | 'reviews'
  | 'contact'
  | 'get-started'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'admin';

export function navigate(page: Page) {
  window.history.pushState({ page }, '', `#${page}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const valid: Page[] = [
    'home',
    'about',
    'services',
    'reviews',
    'contact',
    'get-started',
    'login',
    'register',
    'dashboard',
    'admin',
  ];
  return (valid.includes(hash as Page) ? hash : 'home') as Page;
}

export function usePage(): Page {
  const [page, setPage] = useState<Page>(getPageFromHash);
  useEffect(() => {
    const onPop = () => setPage(getPageFromHash());
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onPop);
    };
  }, []);
  return page;
}
