import { fetchFooter, fetchPage, fetchHeader } from '@/app/api/fetchData';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/header';
import PageWrapper from '@/layout/PageWrapper';
import BodyWrapper from '@/_components/BodyWrapper';
import React from 'react';
import styles from './page.module.scss'; 
import { draftMode } from 'next/headers';
import { PublicationStatus } from '@/graphql/generated';

interface PageProps {
  params: {
    url?: string[];
  };
}

const Page = async ({ params }: PageProps) => {
  console.log('params',params);
  const url = `${(params.url || []).join('/')}`;

  // Correctly await and destructure draftMode once
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? PublicationStatus.Draft : PublicationStatus.Published;

  console.log('DRAFT MODE:', isDraftMode, 'STATUS:', status, 'URL:', url);

  const [footer, page, header] = await Promise.all([
    fetchFooter(),
    fetchPage(url, status),
    fetchHeader()
  ]);

  console.log("Page data fetched:", { url, status, page });

  if (!footer || !header || !page) {
    return (<p>There was an error loading the page.</p>);
  }

  const templateName = (page.Template || '').toLowerCase();
  const templateClass =
    templateName === 'typ_y'
      ? styles.typ_y
      : templateName === 'typ_x'
      ? styles.typ_x
      : '';

  return (
    <BodyWrapper template={page.Template}>
      <Header header={header} />
      <main className={templateClass}>
        <p>Hallo from {page.title || 'Homepage'}</p>
        <PageWrapper page={page} />
      </main>
      <Footer footer={footer} />
    </BodyWrapper>
  );
};

export default Page;