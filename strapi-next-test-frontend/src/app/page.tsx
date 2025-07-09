import { fetchFooter, fetchPage, fetchHeader } from '@/api/fetchData';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/header';
import PageWrapper from '@/layout/PageWrapper';
import React from 'react';

// `app/page.tsx` is the UI for the `/` URL
export default async function Page() {
  const footer = await fetchFooter();
  const page = await fetchPage('/');
  const header = await fetchHeader();

  if (!footer) {
    return (<p>There was an error loading the page.</p>)
  }

  if (!header) {
    return (<p>There was an error loading the page.</p>)
  }

  if(!page) {
    return (<p>There was an error loading the page.</p>)
  }

  return ( 
    <>
      <Header header={header} />
      <p>Hallo from page</p>
      <main><PageWrapper url={'/'} page={page} /></main>
      <Footer footer={footer} /> 
    </>
  )
}