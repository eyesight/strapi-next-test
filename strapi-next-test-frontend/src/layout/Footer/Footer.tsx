import React, {FC} from 'react';
import { FooterFragment } from '@/graphql/generated';

type FooterProps = {
    footer: FooterFragment
}

const Footer: FC<FooterProps> = ({footer}) => {
    console.log(footer.footerText);
    return (
        <>{footer.footerText}</>
    )
}

export default Footer;