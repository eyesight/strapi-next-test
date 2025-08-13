interface GetPreviewPathnameOptions {
    locale: string;
    document: Record<string, any>;
  }
  
  export function getPreviewPathname(
    uid: string,
    { locale, document }: GetPreviewPathnameOptions
  ): string | null {
    if (!document) return null;
  
    switch (uid) {
      case 'api::article.article':
        return `/articles/${document.url}`;
      case 'api::page.page':
        return `${document.url}`;
      default:
        return null;
    }
  }  