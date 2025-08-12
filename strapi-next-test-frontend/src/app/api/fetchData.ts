import { gqlClient } from '@/app/api/apollo'
import {
  FetchFooterQuery,
  FetchFooterQueryVariables, FetchFooterDocument,
  PublicationStatus,
  FetchPageLiveQuery,
  FetchHeaderQuery,
  FetchHeaderQueryVariables,
  FetchHeaderDocument,
  FetchPageDraftQuery,
  FetchPageLiveQueryVariables,
  FetchPageDraftQueryVariables,
  FetchPageDraftDocument,
  FetchPageLiveDocument
} from '@/graphql/generated'

export const fetchPage = async (
  url: string,
  status: PublicationStatus = PublicationStatus.Published
) => {
  try {
    console.log('[fetchPage] Status:', status, 'URL:', url);

    const isDraft = status === PublicationStatus.Draft;

    const result = await gqlClient.query<
      FetchPageLiveQuery | FetchPageDraftQuery,
      FetchPageLiveQueryVariables | FetchPageDraftQueryVariables
    >({
      query: isDraft ? FetchPageDraftDocument : FetchPageLiveDocument,
      variables: { url },
      fetchPolicy: 'network-only',
    });

    console.log('[fetchPage] Raw result:', result.data);

    const pages = (result.data as any).pages;
    let pageData;

    if (Array.isArray(pages?.data)) {
      pageData = pages.data[0];
    } else if (Array.isArray(pages)) {
      pageData = pages[0];
    }

    const page = pageData?.attributes || pageData;

    if (!page) {
      throw new Error('No page found for URL: ' + url);
    }

    return {
      id: pageData.id,
      ...page,
    };
  } catch (error) {
    console.error('[fetchPage] Error fetching page:', error);
    return null;
  }
};

export const fetchFooter = async () => {
  try {
    const result = await gqlClient.query<FetchFooterQuery, FetchFooterQueryVariables>({
      query: FetchFooterDocument,
      fetchPolicy: 'network-only',
    })
    if (!result.data.footer) {
      throw new Error('Failed to fetch footer.')
    }

    return result.data.footer
  } catch (error) {
    console.log(JSON.stringify(error))
    return null
  }
}

export const fetchHeader = async () => {
  try {
    const result = await gqlClient.query<FetchHeaderQuery, FetchHeaderQueryVariables>({
      query: FetchHeaderDocument,
      fetchPolicy: 'network-only',
    })
    if (!result.data.header) {
      throw new Error('Failed to fetch footer.')
    }

    return result.data.header
  } catch (error) {
    console.log(JSON.stringify(error))
    return null
  }
}
