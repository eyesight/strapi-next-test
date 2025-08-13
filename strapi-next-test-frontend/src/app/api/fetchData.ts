import { gqlClient } from '@/app/api/apollo'
import {
  FetchFooterQuery,
  FetchFooterQueryVariables, FetchFooterDocument,
  PublicationStatus,
  FetchPageLiveQuery,
  FetchHeaderQuery,
  FetchHeaderQueryVariables,
  FetchHeaderDocument,
  FetchPageLiveQueryVariables,
  FetchPageLiveDocument
} from '@/graphql/generated';
import { draftMode } from 'next/headers';

export const fetchPage = async (
  url: string,
  status: PublicationStatus = PublicationStatus.Published
) => {
  try {
    const draft = await draftMode();

    if (draft.isEnabled) draft.enable()
      const result = await gqlClient.query<FetchPageLiveQuery, FetchPageLiveQueryVariables>({
        query: FetchPageLiveDocument,
        variables: { url, status: (draft.isEnabled ? 'DRAFT' : 'PUBLISHED') as PublicationStatus },
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
      });
  
      if (result.error) {
        console.log(result.error);
      }
  
      return result.data.pages?.[0] ?? null;
  } catch (error) {
    console.error('[fetchPage] Error fetching page:', error);
    return null;
  }
};

export const fetchFooter = async () => {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) draft.enable();
    const result = await gqlClient.query<FetchFooterQuery, FetchFooterQueryVariables>({
      query: FetchFooterDocument,
      variables: { status: (draft.isEnabled ? 'DRAFT' : 'PUBLISHED') as PublicationStatus },
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
    const draft = await draftMode();
    if (draft.isEnabled) draft.enable();
    const result = await gqlClient.query<FetchHeaderQuery, FetchHeaderQueryVariables>({
      query: FetchHeaderDocument,
      variables: { status: (draft.isEnabled ? 'DRAFT' : 'PUBLISHED') as PublicationStatus },
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
