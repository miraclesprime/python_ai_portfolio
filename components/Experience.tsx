'use client';

import { useRef, useEffect, useState } from 'react';
import styles from './Experience.module.css';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  type: 'ml' | 'data' | 'web';
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Bitoro Labs.',
    role: 'Senior Python AI Engineer',
    location: 'Remote',
    startDate: '2024',
    endDate: 'Present',
    type: 'ml',
    highlights: [
      'Built AI/ML microservices using FastAPI and integrated PyTorch/TensorFlow inference in production',
      'Deployed ML workloads on AWS (EC2, S3, Lambda, SQS, SNS) for scalable data processing',
      'Designed ETL pipelines and data ingestion workflows for ML training and real-time prediction',
      'Implemented PostgreSQL, MongoDB, and Redis for model metadata, feature storage, and caching',
      'Improved CI/CD automation using Jenkins and GitHub Actions for ML deployment pipelines',
      'Collaborated with UI/UX teams to integrate AI-driven outputs into dashboards and user interfaces',
      'Worked closely with product managers to define ML requirements and deliver reliable AI features',
    ],
  },
  {
    company: 'Freelance (Self-employed)',
    role: 'Python Machine Learning Engineer',
    location: 'Remote',
    startDate: '2020',
    endDate: '2024',
    type: 'ml',
    highlights: [
      'Built machine learning models using PyTorch and Keras for analytics and forecasting products',
      'Developed FastAPI-based inference services consumed by web/mobile applications',
      'Automated dataset preprocessing, augmentation, and validation pipelines',
      'Managed AWS EC2 training environments and S3-based dataset storage systems',
      'Implemented PostgreSQL, MySQL, and MongoDB for ML persistence and feature retrieval',
      'Maintained Git + CI/CD pipelines for model versioning, deployment, and rollback',
    ],
  },
  {
    company: 'Upwork',
    role: 'Python Developer',
    location: 'Remote',
    startDate: 'Jan 2014',
    endDate: 'Dec 2019',
    type: 'ml',
    highlights: [
      'Developed Python backend services using Flask with early ML integration for recommendation features',
      'Implemented background workers and preprocessing pipelines for ML batch workflows',
      'Participated in Dockerization and CI/CD deployment of Python and ML microservices',
      'Created reusable REST API components supporting ML-driven product features',
      'Collaborated with UI teams to integrate AI outputs into client-facing applications',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(experiences.length).fill(false));

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

  useEffect(() => {
    if (!isVisible) return;

    experiences.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => {
          const newItems = [...prev];
          newItems[idx] = true;
          return newItems;
        });
      }, idx * 150);

      return () => clearTimeout(timer);
    });
  }, [isVisible]);

  const typeColors: Record<string, string> = {
    ml: 'var(--accent-gold)',
    data: 'var(--accent-blue)',
    web: 'var(--success)'
  };

  return (
    <section id="experience" ref={sectionRef} className={`${styles.experience} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <h2 className="section-title">Experience Timeline</h2>

        <div className={styles.timeline}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`${styles.timelineItem} ${visibleItems[idx] ? styles.visible : ''}`}
            >
              <div className={styles.timelineMarker}>
                <div
                  className={styles.dot}
                  style={{ backgroundColor: typeColors[exp.type] }}
                ></div>
              </div>

              <div className={styles.content}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <p className={styles.company}>{exp.company}</p>
                  </div>
                  <span className={styles.date}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>

                <p className={styles.location}>📍 {exp.location}</p>

                <ul className={styles.highlights}>
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>

                <span
                  className={styles.badge}
                  style={{ borderColor: typeColors[exp.type], color: typeColors[exp.type] }}
                >
                  {exp.type === 'ml' ? 'AI/ML' : exp.type === 'data' ? 'Data/ML' : 'Web'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
