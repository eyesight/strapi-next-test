import { fetchFooter, fetchPage, fetchHeader } from '@/app/api/fetchData';
import Footer from '@/layout/Footer/Footer';
import Header from '@/layout/Header/header';
import BodyWrapper from '@/layout/BodyWrapper/BodyWrapper';
import styles from './PageRenderer.module.scss';
import { draftMode } from 'next/headers';
import { PublicationStatus } from '@/graphql/generated';
import React from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';

interface PageRendererProps {
  url: string;
}

export default async function PageRenderer({ url }: PageRendererProps) {
  const { isEnabled: isDraftMode } = await draftMode();
  const status = isDraftMode ? PublicationStatus.Draft : PublicationStatus.Published;

  const [footer, page, header] = await Promise.all([
    fetchFooter(),
    fetchPage(url, status),
    fetchHeader()
  ]);

  if (!footer || !header || !page) {
    return <p>There was an error loading the page.</p>;
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
        <p>Hallo from { page.title }</p>
        <PageWrapper page={page} />
      </main>
      <Footer footer={footer} />
    </BodyWrapper>
  );
}
