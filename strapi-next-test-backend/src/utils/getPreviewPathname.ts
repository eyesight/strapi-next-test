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
        return `/articles/${document.slug}`;
      case 'api::page.page':
        return `/${document.slug}`;
      default:
        return null;
    }
  }  