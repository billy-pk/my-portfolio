import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const ProjectList = [
  {
    title: 'AI Employee',
    slug: '/projects/ai-employee',
    description: 'Autonomous personal & business assistant — Gmail, finances, invoicing, and social, all human-in-the-loop.',
  },
  {
    title: 'Evolution of Todo',
    slug: '/projects/evolution-of-todo',
    description: 'A 5-phase progression from CLI to a conversational AI agent to an event-driven Kubernetes platform.',
  },
  {
    title: 'Clinic Assistant Agent',
    slug: '/projects/clinic-assistant-agent',
    description: '24/7 AI clinic receptionist for WhatsApp and web chat, with RAG-based Q&A and admin dashboard.',
  },
  {
    title: 'VERA',
    slug: '/projects/vera',
    description: 'Voice-based reservation assistant — phone calls, transcribed, reasoned over, and answered by AI.',
  },
  {
    title: 'DeepResearchAgent',
    slug: '/projects/deep-research-agent',
    description: 'Autonomous multi-agent system that plans, searches, synthesizes, and cites in-depth research.',
  },
  {
    title: 'LangGraph Chatbot',
    slug: '/projects/langgraph-chatbot',
    description: 'Search-augmented conversational AI using LangGraph, GPT-4o mini, and Tavily search.',
  },
];

function ProjectCard({title, slug, description}) {
  return (
    <div className={styles.cardCol}>
      <Link to={slug} className={styles.card}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
