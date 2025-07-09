import React, { FC } from 'react';
import { HeaderFragment } from '@/graphql/generated';
import styles from "./header.module.scss";

type HeaderProps = {
    header: HeaderFragment
}

const Header: FC<HeaderProps> = ({ header }) => {
    return (
        <header className={`${styles.header}`}>{header.headerText}</header>
    )
}

export default Header;  