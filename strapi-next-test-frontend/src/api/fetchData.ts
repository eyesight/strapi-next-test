import { gqlClient } from '@/api/apollo'
import {
  FetchFooterQuery,
  FetchFooterQueryVariables, FetchFooterDocument,
  FetchPageQuery,
  FetchPageQueryVariables,
  FetchPageDocument,
  PublicationStatus,
  FetchHeaderQuery,
  FetchHeaderQueryVariables,
  FetchHeaderDocument
} from '@/graphql/generated'

export const fetchPage = async (url: string, status: PublicationStatus = PublicationStatus.Published) => {
  try {
    const result = await gqlClient.query<FetchPageQuery, FetchPageQueryVariables>({
      query: FetchPageDocument,
      variables: {
        url,
        status
      },
      fetchPolicy: 'network-only',
    })

    const page = result.data.pages?.[0]
    if (!page) {
      throw new Error('No page found.')
    }

    return page
  } catch (error) {
    console.log(JSON.stringify(error))
    return null
  }
}

export const fetchFooter = async () => {
  try {
    const result = await gqlClient.query<FetchFooterQuery, FetchFooterQueryVariables>({
      query: FetchFooterDocument,
      fetchPolicy: 'network-only',
    })
    if (!result.data.footer) {
      console.log('footer',result) 
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
      console.log('header', result)
      throw new Error('Failed to fetch footer.')
    }

    return result.data.header
  } catch (error) {
    console.log(JSON.stringify(error))
    return null
  }
}
