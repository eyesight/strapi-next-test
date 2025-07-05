import React, { FC } from 'react' 
import { ComponentSectionExampleFragment, Page, PageEntity } from '@/graphql/generated' 
// import styles from './PageWrapper.module.scss' 
import Example from '@/sections/Example/Example'

type PageWrapperProps = { 
    page: Page
    url: string 
} 

const PageWrapper: FC<PageWrapperProps> = (props) => { 
    // console.log(props.page.sections)
    return ( 
        <> { props.page.sections?.map((section, index: number) => { 
            if (section) { 
                switch (section.__typename) { 
                    case 'ComponentSectionExample':
                        return (
                            <div key={section.id}>
                                <Example {...section} />
                            </div>
                        );
                    default: 
                        return <span key={index}></span> 
                    } 
                } 
            
                return <span key={index}>Section is empty</span> 
                }) 
            } 
        </> ) 
} 

export default PageWrapper