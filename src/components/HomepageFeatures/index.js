import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const ProjectList = [
  {
    title: 'AI Employee',
    slug: '/projects/ai-employee',
    description: 'Autonomous personal & business assistant — Gmail, finances, invoicing, and social, all human-in-the-loop.',
    image: '/img/portfolio/ai-employee-dashboard.png',
  },
  {
    title: 'Clinic Assistant Agent',
    slug: '/projects/clinic-assistant-agent',
    description: '24/7 AI clinic receptionist for WhatsApp and web chat, with RAG-based Q&A and admin dashboard.',
    image: '/img/portfolio/clinic-admin-dashboard.png',
  },
  {
    title: 'AI Sales Agent',
    slug: '/projects/ai-sales-agent',
    description: 'Multi-agent sales assistant that qualifies leads, prices quotes, and sends PDF proposals.',
    image: '/img/portfolio/ai-sales-agent-demo.gif',
  },
  {
    title: 'Evolution of Todo',
    slug: '/projects/evolution-of-todo',
    description: 'A 5-phase progression from CLI to a conversational AI agent to an event-driven Kubernetes platform.',
    image: '/img/portfolio/ai-todo-app-main-page.png',
  },
  {
    title: 'VERA',
    slug: '/projects/vera',
    description: 'Voice-enabled reservation assistant — phone calls, transcribed, reasoned over, and answered by AI.',
    image: '/img/portfolio/vera-dashboard-1.png',
  },
  {
    title: 'DeepResearchAgent',
    slug: '/projects/deep-research-agent',
    description: 'Autonomous multi-agent system that plans, searches, synthesizes, and cites in-depth research.',
    image: '/img/portfolio/deepresearchagent-1.png',
  },
  {
    title: 'LangGraph Chatbot',
    slug: '/projects/langgraph-chatbot',
    description: 'Search-augmented conversational AI using LangGraph, GPT-4o mini, and Tavily search.',
  },
];

function ProjectCard({title, slug, description, image}) {
  const imageUrl = useBaseUrl(image);
  return (
    <div className={styles.cardCol}>
      <Link to={slug} className={styles.card}>
        {image ? (
          <div className={styles.cardImageWrap}>
            <img src={imageUrl} alt={`${title} screenshot`} className={styles.cardImage} loading="lazy" />
          </div>
        ) : (
          <div className={clsx(styles.cardImageWrap, styles.cardImagePlaceholder)}>
            <span>{title}</span>
          </div>
        )}
        <div className={styles.cardBody}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionHeading}>
          Projects
        </Heading>
        <div className="row">
          {ProjectList.map((props, idx) => (
            <ProjectCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
