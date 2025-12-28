'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.scrollProgress} style={{ width: `${scrollProgress}%` }}></div>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.brand}>
              <h3>Miracle Prime</h3>
              <p>Senior Python/AI Engineer</p>
            </div>

            <div className={styles.links}>
              <div className={styles.linkGroup}>
                <h4>Navigation</h4>
                <a href="#about">About</a>
                <a href="#work">Work</a>
                <a href="#skills">Skills</a>
                <a href="#experience">Experience</a>
                <a href="#contact">Contact</a>
              </div>

              <div className={styles.linkGroup}>
                <h4>Social</h4>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </div>

              <div className={styles.linkGroup}>
                <h4>Resources</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {currentYear} . All rights reserved. Building the future of Web3.
            </p>
            <button
              className={styles.backToTop}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Back to top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
