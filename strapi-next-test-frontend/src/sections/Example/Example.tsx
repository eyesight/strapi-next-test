import { FC } from 'react' 
import { ComponentSectionExampleFragment } from '@/graphql/generated' 

const Example: FC<ComponentSectionExampleFragment> = ({test}) => { 
    return ( test && <p>{test}</p> ) 
} 
    
export default Example