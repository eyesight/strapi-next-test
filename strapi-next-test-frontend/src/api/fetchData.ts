import { gqlClient } from '@/api/apollo'
import {
  FetchFooterQuery,
  FetchFooterQueryVariables, FetchFooterDocument,
  FetchPageQuery,
  FetchPageQueryVariables,
  FetchPageDocument,
  PublicationState,
} from '@/graphql/generated'

export const fetchPage = async(url: string) => {
  try {
    const result = await gqlClient.query<FetchPageQuery, FetchPageQueryVariables>({
      query: FetchPageDocument,
      variables: {
        url: url,
        publicationState: PublicationState.Live
      },
      fetchPolicy: 'network-only',
    })
    if (!result.data.pages?.data) {
      console.log(result)
      throw new Error('Failed to fetch footer.')
    }

    return result.data.pages?.data[0]
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
    if (!result.data.footer?.data) {
      console.log(result)
      throw new Error('Failed to fetch footer.')
    }

    return result.data.footer?.data
  } catch (error) {
    console.log(JSON.stringify(error))
    return null
  }
}
