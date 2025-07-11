'use client';

import React, { useEffect } from 'react';
import styles from './BodyWrapper.module.scss'; // use local scss or adjust path

export default function BodyWrapper({
  children,
  template
}: {
  children: React.ReactNode;
  template: string;
}) {
  useEffect(() => {
    document.body.classList.remove(styles.typ_x, styles.typ_y);
    if (template === 'Typ_X') {
      document.body.classList.add(styles.typ_x);
    } else if (template === 'Typ_Y') {
      document.body.classList.add(styles.typ_y);
    }
  }, [template]);

  return <>{children}</>;
}
