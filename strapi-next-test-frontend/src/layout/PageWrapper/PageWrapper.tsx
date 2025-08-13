import React, { FC } from 'react';
import { ComponentSectionExampleFragment, Page } from '@/graphql/generated';
import Example from '@/sections/Example/Example';
import styles from './pageWrapper.module.scss';

type PageWrapperProps = {
  page: Page;
};

const PageWrapper: FC<PageWrapperProps> = ({ page }) => {
  const wrapperClass =
    page.Template === 'Typ_Y'
      ? styles.typ_y
      : page.Template === 'Typ_X'
      ? styles.typ_x
      : '';

  return (
    <div className={wrapperClass}>
      {/* SECTIONS */}
      {page.Template === 'Typ_Y' &&
        page.sections?.map((section, index) => {
          if (!section) {
            return <span key={index}>Section is empty</span>;
          }

          switch (section?.__typename) {
            case 'ComponentSectionExample':
              return (
                <div key={section.id}>
                  <Example {...(section as ComponentSectionExampleFragment)} />
                </div>
              );

            case 'Error':
              return (
                <div key={index} style={{ color: 'red' }}>
                  Error in section: {section.message}
                </div>
              );

            default:
              return (
                <div key={index} style={{ color: 'gray' }}>
                  Unknown section type: {section.__typename}
                </div>
              );
          }
        })}

      {/* BLOCKS */}
      {page.Template === 'Typ_X' &&
        page.blocks?.map((block, index) => {
          if (!block) {
            return <span key={index}>Block is empty</span>;
          }

          switch (block.__typename) {
            case 'ComponentSectionExample':
              return (
                <div key={block.id}>
                  <Example {...(block as ComponentSectionExampleFragment)} />
                </div>
              );

            case 'Error':
              return (
                <div key={index} style={{ color: 'red' }}>
                  Error in block: {block.message}
                </div>
              );

            default:
              return (
                <div key={index} style={{ color: 'gray' }}>
                  Unknown block type: {block.__typename}
                </div>
              );
          }
        })}
    </div>
  );
};

export default PageWrapper;
