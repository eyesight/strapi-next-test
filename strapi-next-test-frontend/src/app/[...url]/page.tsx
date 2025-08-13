import { fetchFooter, fetchPage, fetchHeader } from '@/app/api/fetchData';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/header';
import PageWrapper from '@/layout/PageWrapper';
import BodyWrapper from '@/_components/BodyWrapper';
import React from 'react';
import styles from './page.module.scss'; 
import { draftMode } from 'next/headers';
import { PublicationStatus } from '@/graphql/generated';

const Page = async ({ params }: { params: Promise<{ url?: string[] }> }) => {
  const resolvedParams = await params;
  const url = resolvedParams.url?.length
  ? `${resolvedParams.url.join('/')}`
  : '/';

  // Correctly await and destructure draftMode once
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? PublicationStatus.Draft : PublicationStatus.Published;

  const [footer, page, header] = await Promise.all([
    fetchFooter(),
    fetchPage(url, status),
    fetchHeader()
  ]);

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