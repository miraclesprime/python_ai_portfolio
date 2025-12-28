'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './FeaturedWork.module.css';

interface CaseStudy {
  id: string;
  title: string;
  descriptor: string;
  impact: string;
  tech: string[];
  url: string;
  image?: string;
  details?: {
    overview: string;
    role: string;
    results: string[];
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: 'business-in-a-box',
    title: 'Business-In-a-Box',
    descriptor: 'Project Task Management App',
    impact: 'Powerful task assignment, real-time progress tracking, and dynamic work reallocation',
    url: 'https://project.business-in-a-box.com/mytasks',
    tech: ['Nuxt', 'TypeScript', 'Node.js', 'PostgreSQL'],
    details: {
      overview: 'A comprehensive task management application designed for visionary leaders. Effortlessly assign tasks with clarity, track progress in real-time, and dynamically reallocate work as priorities shift.',
      role: 'Full-Stack Developer',
      results: [
        'Built intuitive task assignment and tracking interface',
        'Implemented real-time progress updates and collaboration features',
        'Designed flexible task reallocation system',
      ]
    }
  },
  {
    id: 'apgile',
    title: 'Apgile',
    descriptor: 'Real-time Service Management Platform',
    impact: 'Enhanced service quality and customer experience with real-time monitoring',
    url: 'https://apgile.com/',
    tech: ['React', 'Python', 'FastAPI', 'WebSocket', 'PostgreSQL'],
    details: {
      overview: 'A real-time service management platform enabling teams to receive and manage customer service requests, send and escalate alerts, and monitor team performance. The system includes wearable (smartwatch) interaction support.',
      role: 'Full-Stack Engineer',
      results: [
        'Implemented real-time request management and escalation workflows',
        'Built performance monitoring dashboards for team insights',
        'Integrated wearable device support for on-the-go management',
      ]
    }
  },
    // AI Projects
    {
      id: 'ai-microservices',
      title: 'AI/ML Microservices Platform',
      descriptor: 'Production-grade FastAPI microservices for ML inference',
      impact: 'Enabled scalable, real-time AI features in production',
      url: '#',
      tech: ['Python', 'FastAPI', 'PyTorch', 'TensorFlow', 'AWS'],
      details: {
        overview: 'Built and deployed microservices for ML inference using FastAPI, integrating PyTorch/TensorFlow models and serving predictions at scale.',
        role: 'Senior Python AI Engineer',
        results: [
          'Integrated ML models into production APIs',
          'Deployed scalable workloads on AWS (EC2, Lambda, S3, SQS, SNS)',
          'Collaborated with UI/UX teams for dashboard integration',
        ]
      }
    },
    {
      id: 'ml-forecasting',
      title: 'ML Analytics & Forecasting',
      descriptor: 'PyTorch/Keras models for analytics and prediction',
      impact: 'Delivered actionable insights and forecasts for business products',
      url: '#',
      tech: ['PyTorch', 'Keras', 'FastAPI', 'AWS', 'PostgreSQL'],
      details: {
        overview: 'Developed machine learning models and inference services for analytics and forecasting, consumed by web/mobile apps.',
        role: 'Python Machine Learning Engineer',
        results: [
          'Built and deployed PyTorch/Keras models',
          'Automated dataset preprocessing and validation',
          'Maintained CI/CD for model versioning and deployment',
        ]
      }
    },
    {
      id: 'etl-pipelines',
      title: 'ETL & Data Ingestion Pipelines',
      descriptor: 'Robust data workflows for ML training and prediction',
      impact: 'Supported real-time and batch ML pipelines',
      url: '#',
      tech: ['Python', 'Celery', 'PostgreSQL', 'MongoDB', 'Redis'],
      details: {
        overview: 'Designed ETL pipelines and data ingestion workflows for ML training and real-time prediction, leveraging Celery and modern databases.',
        role: 'Python Developer',
        results: [
          'Implemented background workers and batch ML workflows',
          'Optimized feature storage and caching with PostgreSQL, MongoDB, Redis',
          'Created reusable REST API components for ML features',
        ]
      }
    },
    // Add more AI projects here as needed
  {
    id: 'bookkeeping-ai',
    title: 'Bookkeeping/Finance Automation',
    descriptor: 'AI-Powered Financial Operations Platform',
    impact: 'Streamlined financial operations with intelligent categorization and automation',
    url: 'https://booke.ai/us',
    tech: ['Python', 'FastAPI', 'Machine Learning', 'React', 'PostgreSQL'],
    details: {
      overview: 'An AI-powered platform that streamlines daily financial operations including transaction categorization, bank reconciliations, invoice and receipt data extraction, error detection, and month-end close support. Seamlessly integrates with Xero and QuickBooks Online.',
      role: 'Backend Engineer / ML Integrator',
      results: [
        'Designed ML pipelines for transaction categorization and data extraction',
        'Implemented integrations with accounting systems (Xero, QuickBooks Online)',
        'Built robust error detection and reconciliation workflows',
      ]
    }
  },
  {
    id: 'vinext',
    title: 'Vinext.ai',
    descriptor: 'AI-Powered Image & Video Generation Platform',
    impact: 'Scalable backend for instant AI-driven creative content generation',
    url: 'https://vinext.ai/',
    tech: ['Python', 'FastAPI', 'Generative AI', 'Microservices', 'AWS'],
    details: {
      overview: 'A web platform providing AI-powered image and video generation tools. Users input text or media prompts to generate visuals and short videos instantly using advanced generative models.',
      role: 'Backend Engineer',
      results: [
        'Designed and scaled Python FastAPI microservices for handling user requests',
        'Orchestrated AI generation workflows with efficient processing pipelines',
        'Optimized backend to serve results efficiently to the frontend',
      ]
    }
  },
  {
    id: 'taproot',
    title: 'TapRooT® Root Cause Analysis',
    descriptor: 'Enterprise Analysis Platform for Regulated Industries',
    impact: 'Modernized platform serving energy, healthcare, and manufacturing sectors',
    url: 'https://taproot.com/',
    tech: ['React', 'TypeScript', 'Django', 'Flask', 'PostgreSQL', 'AWS'],
    details: {
      overview: 'An enterprise React/Django platform used in regulated industries such as energy, healthcare, and manufacturing. Modernized frontend using TypeScript with a composition-based architecture and reusable accessible UI components.',
      role: 'Full-Stack Developer',
      results: [
        'Modernized frontend with TypeScript and Tailwind CSS/shadcn/ui components',
        'Improved backend API performance through query optimization and caching',
        'Implemented comprehensive Jest and Cypress test coverage',
      ]
    }
  },
];

export default function FeaturedWork() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
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
    <>
      <section id="work" ref={sectionRef} className={`${styles.work} ${isVisible ? styles.visible : ''}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className="section-title">Selected Work</h2>
            <p className={styles.subtitle}>Please feel free to review my previous projects for reference.</p>
          </div>

          <div className={styles.grid}>
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={styles.card}
                onClick={() => setSelectedStudy(study)}
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                }}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <p className={styles.cardDescriptor}>{study.descriptor}</p>
                  <p className={styles.cardImpact}>{study.impact}</p>

                  <div className={styles.tech}>
                    {study.tech.slice(0, 3).map((t) => (
                      <span key={t} className={styles.techPill}>
                        {t}
                      </span>
                    ))}
                    {study.tech.length > 3 && (
                      <span className={styles.techPill}>+{study.tech.length - 3}</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardCta}>
                  <a href={study.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none'}}>
                    Visit Project
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedStudy && (
        <div className={styles.modalOverlay} onClick={() => setSelectedStudy(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedStudy(null)}>
              ✕
            </button>

            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>{selectedStudy.title}</h2>
                  <p className={styles.modalDescriptor}>{selectedStudy.descriptor}</p>
                </div>
                <a href={selectedStudy.url} target="_blank" rel="noopener noreferrer" style={{padding: '8px 16px', backgroundColor: 'var(--accent-gold)', color: '#0a0e27', borderRadius: '6px', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap'}}>
                  Visit Project ↗
                </a>
              </div>

              <div className={styles.modalBody}>
                {selectedStudy.details?.overview && (
                  <div className={styles.section}>
                    <h3>Overview</h3>
                    <p>{selectedStudy.details.overview}</p>
                  </div>
                )}

                {selectedStudy.details?.role && (
                  <div className={styles.section}>
                    <h3>My Role</h3>
                    <p>{selectedStudy.details.role}</p>
                  </div>
                )}

                <div className={styles.section}>
                  <h3>Impact & Results</h3>
                  <ul className={styles.resultsList}>
                    {selectedStudy.details?.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.section}>
                  <h3>Tech Stack</h3>
                  <div className={styles.techStack}>
                    {selectedStudy.tech.map((t) => (
                      <span key={t} className={styles.techPillLarge}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
