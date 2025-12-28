'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './About.module.css';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <h2 className="section-title">About & Value</h2>

        <div className={styles.content}>
          <div className={styles.narrative}>
            <p>
              Senior Python/AI Engineer with 10+ years of experience building production-grade AI/ML systems and backend services. Specialized in FastAPI, PyTorch, TensorFlow, and scalable cloud deployments on AWS.
            </p>
            <p>
              I design and deploy AI/ML microservices, architect ETL/data pipelines, and deliver robust model inference APIs for real-time and batch prediction. I have deep experience with Python, ML frameworks, and cloud automation.
            </p>
            <p>
              I thrive in cross-functional teams, collaborating with product, data, and UI/UX to deliver reliable, user-focused AI features from prototype to production.
            </p>
          </div>

          <div className={styles.facts}>
            <div className={styles.factItem}>
              <div className={styles.factLabel}>Location</div>
              <div className={styles.factValue}>Remote</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Experience</div>
              <div className={styles.factValue}>10+ years</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Primary Focus</div>
              <div className={styles.factValue}>Python, AI/ML, Cloud</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>ML/AI Stack</div>
              <div className={styles.factValue}>PyTorch, TensorFlow, Keras, Scikit-learn</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Cloud & Data</div>
              <div className={styles.factValue}>AWS, PostgreSQL, MongoDB, Redis</div>
            </div>

            <div className={styles.factItem}>
              <div className={styles.factLabel}>Open To</div>
              <div className={styles.factValue}>Collaboration & Contract Roles</div>
            </div>
          </div>
        </div>

        <div className={styles.values}>
          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🔒</div>
            <h3>Security First</h3>
            <p>Every contract audited, every mechanism tested. Security is never a trade-off.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>⚡</div>
            <h3>Performance Obsessed</h3>
            <p>Gas optimization, efficient state design, and scalable architecture by default.</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.valueIcon}>🔗</div>
            <h3>Cross-Chain Ready</h3>
            <p>Building protocols that work seamlessly across multiple blockchains and layers.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
