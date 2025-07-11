import React, { FC } from 'react';
import { ComponentSectionExampleFragment, Page } from '@/graphql/generated';
import Example from '@/sections/Example/Example';
import styles from './pageWrapper.module.scss';

type PageWrapperProps = {
  page: Page;
  url: string;
};

const PageWrapper: FC<PageWrapperProps> = ({ page }) => {

  const wrapperClass = page.Template === 'Typ_Y'
    ? styles.typ_y
    : page.Template === 'Typ_X'
    ? styles.typ_x
    : '';

  return (
    <div className={wrapperClass}>
      {page.Template === 'Typ_Y' &&
        page.sections?.map((section, index) => {
          if (!section) {
            return <span key={index}>Section is empty</span>;
          }

          switch (section.__typename) {
            case 'ComponentSectionExample':
              return (
                <div key={(section as ComponentSectionExampleFragment).id}>
                  <Example {...(section as ComponentSectionExampleFragment)} />
                </div>
              );
            default:
              return <span key={index}></span>;
          }
        })}

      {page.Template === 'Typ_X' &&
        page.blocks?.map((block, index) => {
          if (!block) {
            return <span key={index}>Block is empty</span>;
          }

          switch (block.__typename) {
            case 'ComponentSectionExample':
              return (
                <div key={(block as ComponentSectionExampleFragment).id}>
                  <Example {...(block as ComponentSectionExampleFragment)} />
                </div>
              );
            default:
              return <span key={index}></span>;
          }
        })}
    </div>
  );
};

export default PageWrapper;
