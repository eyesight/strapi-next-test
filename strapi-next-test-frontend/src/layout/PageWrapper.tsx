import React, { FC } from 'react';
import { ComponentSectionExampleFragment, Page } from '@/graphql/generated';
import Example from '@/sections/Example/Example';

type PageWrapperProps = {
  page: Page;
  url: string;
};

const PageWrapper: FC<PageWrapperProps> = ({ page }) => {
  return (
    <>
      {page.sections?.map((section, index) => {
        if (!section) {
          return <span key={index}>Section is empty</span>;
        }

        switch (section.__typename) {
          case 'ComponentSectionExample':
            // TypeScript needs assurance that __typename is exactly "ComponentSectionExample"
            // We can cast the section to the fragment type here:
            return (
              <div key={(section as ComponentSectionExampleFragment).id}>
                <Example {...(section as ComponentSectionExampleFragment)} />
              </div>
            );

          default:
            return <span key={index}></span>;
        }
      })}
    </>
  );
};

export default PageWrapper;
