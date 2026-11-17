import { useEffect } from 'react';

export function useStyles(stylesheet) {
  useEffect(() => {
    const linkId = 'page-styling';

    let link = document.getElementById(linkId);

    if (!link) {
      link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    link.href = stylesheet;

    return () => {
      link.remove();
    };
  }, [stylesheet]);
}