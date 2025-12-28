'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Skills.module.css';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    description: string;
  }>;
}

const skillsData: Record<string, SkillCategory> = {
  ai: {
    name: 'AI & Machine Learning',
    skills: [
      { name: 'PyTorch', description: 'Deep learning, model training & inference' },
      { name: 'TensorFlow', description: 'ML pipelines, model optimization' },
      { name: 'Keras', description: 'Neural network prototyping' },
      { name: 'Scikit-learn', description: 'Classical ML, feature engineering' },
      { name: 'ML Pipelines', description: 'Training, inference, embeddings' },
    ],
  },
  python: {
    name: 'Python & Backend',
    skills: [
      { name: 'Python 3.x', description: 'Modern Python for ML and backend' },
      { name: 'FastAPI', description: 'Async APIs and microservices' },
      { name: 'Flask', description: 'Lightweight Python services' },
      { name: 'Django', description: 'Full-stack web frameworks' },
      { name: 'RESTful APIs', description: 'API design for ML systems' },
      { name: 'Async/Await', description: 'Concurrent backend logic' },
      { name: 'Microservices', description: 'Distributed ML architectures' },
    ],
  },
  cloud: {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', description: 'EC2, S3, Lambda, SQS, SNS, model deployment' },
      { name: 'Serverless', description: 'Cloud automation for ML' },
      { name: 'Docker', description: 'Containerization for ML workloads' },
      { name: 'Jenkins', description: 'CI/CD for ML pipelines' },
      { name: 'GitHub Actions', description: 'CI/CD automation' },
      { name: 'Linux', description: 'Production environments' },
    ],
  },
  data: {
    name: 'Data Pipelines & ETL',
    skills: [
      { name: 'ETL Workflows', description: 'Data ingestion, preprocessing, streaming' },
      { name: 'Celery/RQ', description: 'Task queues for ML pipelines' },
      { name: 'Streaming', description: 'Real-time data for ML' },
    ],
  },
  db: {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', description: 'Schema design, query optimization' },
      { name: 'MySQL', description: 'OLTP, feature storage' },
      { name: 'MongoDB', description: 'NoSQL, aggregation' },
      { name: 'Redis', description: 'Caching, feature storage' },
    ],
  },
  tools: {
    name: 'Tools & Collaboration',
    skills: [
      { name: 'Git', description: 'Version control' },
      { name: 'GitHub/Bitbucket', description: 'Collaboration, CI/CD' },
      { name: 'OpenAPI/Swagger', description: 'API documentation' },
      { name: 'JavaScript/HTML/CSS', description: 'UI/UX collaboration, ML API integration' },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('blockchain');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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
    <section id="skills" ref={sectionRef} className={`${styles.skills} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-title">Skills & Tooling</h2>
          <p className={styles.subtitle}>Production-grade expertise across blockchain, full-stack, and DevOps.</p>
        </div>

        <div className={styles.tabs}>
          {Object.entries(skillsData).map(([key, category]) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {Object.entries(skillsData).map(([key, category]) => (
            <div
              key={key}
              className={`${styles.skillsGrid} ${activeTab === key ? styles.visible : ''}`}
            >
              {category.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={styles.skillCard}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    animation: activeTab === key ? `fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.05}s both` : 'none',
                  }}
                >
                  <div className={styles.skillPill}>{skill.name}</div>
                  <div className={`${styles.tooltip} ${hoveredSkill === skill.name ? styles.show : ''}`}>
                    {skill.description}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.highlights}>
          <h3>Key Proficiencies</h3>
          <div className={styles.highlightList}>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🤖</span>
              <span>AI/ML microservices (FastAPI, PyTorch, TensorFlow)</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>📈</span>
              <span>ETL/data pipelines for ML training and inference</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>☁️</span>
              <span>Cloud automation & deployment (AWS, Docker, CI/CD)</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🗄️</span>
              <span>Database design (PostgreSQL, MongoDB, Redis)</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.icon}>🤝</span>
              <span>Cross-team collaboration (UI/UX, product, data)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
