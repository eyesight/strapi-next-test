import { fetchFooter, fetchPage } from '@/api/fetchData';
import { FetchPageDocument } from '@/graphql/generated';
import Footer from '@/layout/Footer/Footer';
import PageWrapper from '@/layout/PageWrapper';
import React from 'react';

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  const footer = await fetchFooter();
  const page = await fetchPage('/')

  if (!footer?.attributes) {
    return (<p>There was an error loading the page.</p>)
  }

  if(!page?.attributes) {
    return (<p>There was an error loading the page.</p>)
  }

  return (
    <>
      <p>Hallo from page</p>
      <main><PageWrapper url={'/'} page={page.attributes} /></main>
      <Footer footer={footer.attributes} /> 
    </>
  )
}