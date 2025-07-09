import React, { FC } from 'react';
import { FooterFragment } from '@/graphql/generated';
import styles from "./footer.module.scss";

type FooterProps = {
    footer: FooterFragment
}

const Footer: FC<FooterProps> = ({ footer }) => {
    return (
        <footer className={`${styles.footer}`}>{footer.footerText}</footer>
    )
}

export default Footer;