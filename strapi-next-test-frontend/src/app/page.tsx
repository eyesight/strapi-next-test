import { fetchFooter, fetchPage, fetchHeader } from '@/app/api/fetchData';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/header';
import PageWrapper from '@/layout/PageWrapper';
import BodyWrapper from '@/_components/BodyWrapper';
import React from 'react';
import styles from './page.module.scss'; 
import { draftMode } from 'next/headers'
import { PublicationStatus } from '@/graphql/generated'

interface PageProps {
  params: {
    url: string[]
  }
}

export const revalidate: number = 60

const Page = async ({ params }: PageProps) => {
  const url = "/";

  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? PublicationStatus.Draft : PublicationStatus.Published;

  const [footer, page, header] = await Promise.all([
    fetchFooter(),
    fetchPage(`${url}`, status),
    fetchHeader()
  ]);

  console.log('DRAFT MODE:', draftMode().isEnabled, 'STATUS:', status );
  console.log("Page props:", { url, status, page });
  
  if (!footer || !header || !page) {
    return (<p>There was an error loading the page.</p>);
  }
  
  const templateClass = page.Template === 'Typ_Y'
    ? styles.typ_y
    : page.Template === 'Typ_X'
    ? styles.typ_x
    : '';
  
  return (
    <BodyWrapper template={page.Template}>
      <Header header={header} />
      <main className={templateClass}>
        <p>Hallo from Homepage</p>
        <PageWrapper page={page} />
      </main>
      <Footer footer={footer} />
    </BodyWrapper>
  );
}

export default Page