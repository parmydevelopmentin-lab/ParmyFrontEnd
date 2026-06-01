import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronDownIcon, CheckCircleIcon, ArrowRightIcon,
    ClockIcon, UsersIcon, AwardIcon, StarIcon,
    CodeIcon, ShieldIcon, GlobeIcon, DatabaseIcon, BrainIcon, ZapIcon,
    BookOpenIcon, MailIcon,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubTopic { name: string }
interface Topic { title: string; subtopics: SubTopic[] }
interface Module { module: string; topics: Topic[] }
interface Course {
    id: string;
    title: string;
    tagline: string;
    description: string;
    duration: string;
    level: string;
    enrolled: string;
    rating: string;
    icon: React.FC<{ className?: string }>;
    heroImage: string;
    cardImage: string;
    gradientFrom: string;
    gradientTo: string;
    accent: string;
    badge: string;
    highlights: string[];
    syllabus: Module[];
}

// ─── Course Data ───────────────────────────────────────────────────────────────
const COURSES: Course[] = [
    // ── 1. Full Stack Java ──
    {
        id: 'full-stack-java',
        title: 'Full Stack Java',
        tagline: 'Build enterprise-grade web apps with Java, Spring Boot & React',
        description:
            'Master the complete Java ecosystem — from core programming to Spring Boot microservices, REST APIs, and a modern React frontend. This course takes you from zero to a confident full-stack engineer ready for enterprise roles.',
        duration: '6 Months',
        level: 'Beginner → Advanced',
        enrolled: '3,200+',
        rating: '4.8',
        icon: CodeIcon,
        heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-blue-900',
        accent: 'blue-400',
        badge: 'Most Popular',
        highlights: ['Live projects', 'Industry mentors', 'Placement support', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – Core Java Fundamentals',
                topics: [
                    { title: 'Java Basics', subtopics: [{ name: 'JDK, JRE, JVM architecture' }, { name: 'Data types, variables & operators' }, { name: 'Control flow: if/else, switch, loops' }] },
                    { title: 'Object-Oriented Programming', subtopics: [{ name: 'Classes, objects & constructors' }, { name: 'Inheritance, polymorphism & abstraction' }, { name: 'Interfaces & encapsulation' }] },
                    { title: 'Collections & Generics', subtopics: [{ name: 'List, Set, Map, Queue' }, { name: 'Iterator & comparable' }, { name: 'Generics & wildcards' }] },
                    { title: 'Exception Handling & I/O', subtopics: [{ name: 'Checked vs unchecked exceptions' }, { name: 'Custom exceptions' }, { name: 'File & stream I/O' }] },
                ],
            },
            {
                module: 'Module 2 – Advanced Java',
                topics: [
                    { title: 'Multithreading & Concurrency', subtopics: [{ name: 'Thread lifecycle & synchronization' }, { name: 'Executor framework' }, { name: 'CompletableFuture & reactive patterns' }] },
                    { title: 'Java 8+ Features', subtopics: [{ name: 'Lambda expressions & functional interfaces' }, { name: 'Stream API & method references' }, { name: 'Optional, LocalDate & new APIs' }] },
                    { title: 'JDBC & Database Connectivity', subtopics: [{ name: 'JDBC drivers & connections' }, { name: 'CRUD with PreparedStatement' }, { name: 'Connection pooling (HikariCP)' }] },
                ],
            },
            {
                module: 'Module 3 – Spring Ecosystem',
                topics: [
                    { title: 'Spring Core & IoC', subtopics: [{ name: 'Dependency injection & beans' }, { name: 'ApplicationContext & annotations' }, { name: 'AOP concepts' }] },
                    { title: 'Spring Boot', subtopics: [{ name: 'Auto-configuration & starters' }, { name: 'RESTful API development' }, { name: 'Spring Data JPA & Hibernate' }] },
                    { title: 'Spring Security', subtopics: [{ name: 'Authentication & authorization' }, { name: 'JWT-based security' }, { name: 'OAuth2 integration' }] },
                    { title: 'Microservices', subtopics: [{ name: 'Service discovery (Eureka)' }, { name: 'API Gateway (Spring Cloud Gateway)' }, { name: 'Config server & circuit breaker' }] },
                ],
            },
            {
                module: 'Module 4 – Frontend with React',
                topics: [
                    { title: 'HTML5, CSS3 & JavaScript ES6+', subtopics: [{ name: 'Semantic HTML & CSS Flexbox/Grid' }, { name: 'ES6 modules, arrow functions & destructuring' }, { name: 'Async/Await & Promises' }] },
                    { title: 'React Fundamentals', subtopics: [{ name: 'Components, props & state' }, { name: 'Hooks: useState, useEffect, useContext' }, { name: 'React Router & forms' }] },
                    { title: 'State Management & API', subtopics: [{ name: 'Redux Toolkit / Zustand' }, { name: 'Axios & REST integration' }, { name: 'Error boundaries & lazy loading' }] },
                ],
            },
            {
                module: 'Module 5 – DevOps & Deployment',
                topics: [
                    { title: 'Build & CI/CD', subtopics: [{ name: 'Maven & Gradle' }, { name: 'Jenkins / GitHub Actions pipelines' }, { name: 'SonarQube & code quality' }] },
                    { title: 'Containerisation', subtopics: [{ name: 'Docker images & containers' }, { name: 'Docker Compose for multi-service apps' }, { name: 'Kubernetes basics' }] },
                    { title: 'Cloud Deployment', subtopics: [{ name: 'AWS EC2 / Elastic Beanstalk' }, { name: 'RDS & S3 integration' }, { name: 'Monitoring with CloudWatch' }] },
                ],
            },
        ],
    },

    // ── 2. Full Stack Python ──
    {
        id: 'full-stack-python',
        title: 'Full Stack Python',
        tagline: 'From Python fundamentals to production-ready Django & Vue apps',
        description:
            'Learn Python from scratch and scale up through Django REST Framework, PostgreSQL, and Vue.js. You will build real-world projects and be job-ready for full-stack Python developer roles.',
        duration: '5 Months',
        level: 'Beginner → Advanced',
        enrolled: '2,800+',
        rating: '4.9',
        icon: CodeIcon,
        heroImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-yellow-500',
        gradientTo: 'to-yellow-800',
        accent: 'yellow-400',
        badge: 'Trending',
        highlights: ['Real projects', 'Career mentorship', '1-on-1 doubt sessions', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – Python Core',
                topics: [
                    { title: 'Python Basics', subtopics: [{ name: 'Variables, data types & type casting' }, { name: 'Strings, lists, tuples, dicts & sets' }, { name: 'Loops, comprehensions & functions' }] },
                    { title: 'OOP in Python', subtopics: [{ name: 'Classes, objects & __init__' }, { name: 'Inheritance & polymorphism' }, { name: 'Magic methods & decorators' }] },
                    { title: 'File Handling & Modules', subtopics: [{ name: 'Reading/writing files & CSV/JSON' }, { name: 'Standard library modules' }, { name: 'Virtual environments & pip' }] },
                ],
            },
            {
                module: 'Module 2 – Advanced Python',
                topics: [
                    { title: 'Functional Programming', subtopics: [{ name: 'map, filter, reduce & lambda' }, { name: 'Generators & iterators' }, { name: 'Context managers' }] },
                    { title: 'Concurrency', subtopics: [{ name: 'Threading & multiprocessing' }, { name: 'asyncio & event loop' }, { name: 'aiohttp & async APIs' }] },
                    { title: 'Testing', subtopics: [{ name: 'unittest & pytest' }, { name: 'Mocking & fixtures' }, { name: 'TDD workflow' }] },
                ],
            },
            {
                module: 'Module 3 – Django & DRF',
                topics: [
                    { title: 'Django Framework', subtopics: [{ name: 'MTV architecture & project structure' }, { name: 'Models, views, templates & URL routing' }, { name: 'Django ORM & migrations' }] },
                    { title: 'Django REST Framework', subtopics: [{ name: 'Serializers & ViewSets' }, { name: 'Authentication: JWT & session' }, { name: 'Pagination, filtering & throttling' }] },
                    { title: 'Database & Caching', subtopics: [{ name: 'PostgreSQL with psycopg2' }, { name: 'Redis caching & Celery tasks' }, { name: 'Query optimization' }] },
                ],
            },
            {
                module: 'Module 4 – Frontend with Vue.js',
                topics: [
                    { title: 'HTML/CSS/JavaScript Essentials', subtopics: [{ name: 'Flexbox, Grid & responsive design' }, { name: 'ES6+ features' }, { name: 'Fetch API & Promises' }] },
                    { title: 'Vue 3 Fundamentals', subtopics: [{ name: 'Composition API & reactive data' }, { name: 'Directives, components & props' }, { name: 'Vue Router & Pinia' }] },
                    { title: 'API Integration', subtopics: [{ name: 'Axios with Django API' }, { name: 'Authentication flow' }, { name: 'Deployment with Vite' }] },
                ],
            },
            {
                module: 'Module 5 – Deployment & DevOps',
                topics: [
                    { title: 'Containerisation', subtopics: [{ name: 'Docker & docker-compose' }, { name: 'Nginx as reverse proxy' }, { name: 'Environment variables & secrets' }] },
                    { title: 'CI/CD & Cloud', subtopics: [{ name: 'GitHub Actions workflows' }, { name: 'Deploy to AWS / Heroku / Render' }, { name: 'PostgreSQL on RDS' }] },
                ],
            },
        ],
    },

    // ── 3. Cybersecurity AI ──
    {
        id: 'cybersecurity-ai',
        title: 'Cybersecurity AI',
        tagline: 'Defend, detect & respond with AI-powered security operations',
        description:
            'A hands-on program bringing together cybersecurity fundamentals, AI-driven threat detection, and SOC operations. Prepare for advanced security roles with practical AI-infused defense skills.',
        duration: '4 Months',
        level: 'Intermediate → Expert',
        enrolled: '1,500+',
        rating: '4.7',
        icon: ShieldIcon,
        heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-red-600',
        gradientTo: 'to-red-900',
        accent: 'red-400',
        badge: 'High Demand',
        highlights: ['AI threat detection', 'CTF challenges', 'Cert prep', 'Job assistance'],
        syllabus: [
            {
                module: 'Module 1 – Security Foundations & AI Basics',
                topics: [
                    { title: 'Cybersecurity Fundamentals', subtopics: [{ name: 'Risk assessment & threat landscape' }, { name: 'CIA triad & security controls' }, { name: 'Network security essentials' }] },
                    { title: 'AI for Security', subtopics: [{ name: 'Machine learning concepts' }, { name: 'Anomaly detection techniques' }, { name: 'AI in threat intelligence' }] },
                    { title: 'Security Data & Telemetry', subtopics: [{ name: 'Logs, events & metrics' }, { name: 'SIEM ingest pipelines' }, { name: 'Alert prioritisation' }] },
                ],
            },
            {
                module: 'Module 2 – Ethical Hacking & Defensive Tools',
                topics: [
                    { title: 'Pentesting Essentials', subtopics: [{ name: 'Reconnaissance & scanning' }, { name: 'Vulnerability assessment workflows' }, { name: 'OWASP Top 10 review' }] },
                    { title: 'Defensive Tooling', subtopics: [{ name: 'Endpoint detection & response' }, { name: 'Firewall & IDS/IPS configuration' }, { name: 'Threat hunting playbooks' }] },
                    { title: 'Automation & Response', subtopics: [{ name: 'SOAR fundamentals' }, { name: 'Automated alert enrichment' }, { name: 'Incident response orchestration' }] },
                ],
            },
            {
                module: 'Module 3 – SOC Operations & Forensics',
                topics: [
                    { title: 'SOC Workflows', subtopics: [{ name: 'Alert triage & escalation' }, { name: 'Investigation procedures' }, { name: 'Case management' }] },
                    { title: 'Digital Forensics', subtopics: [{ name: 'Evidence acquisition & chain of custody' }, { name: 'Memory and disk forensics' }, { name: 'Log analysis with ELK' }] },
                    { title: 'Compliance & Reporting', subtopics: [{ name: 'ISO/NIST frameworks' }, { name: 'Incident reporting standards' }, { name: 'Security metrics and KPIs' }] },
                ],
            },
        ],
    },

    // ── 4. Python With AI ──
    {
        id: 'python-with-ai',
        title: 'Python With AI',
        tagline: 'Build intelligent applications by combining Python programming and AI.',
        description:
            'Gain strong Python foundations, explore machine learning, NLP, and computer vision, and deploy AI solutions end-to-end. Ideal for developers who want to create practical AI-powered products.',
        duration: '5 Months',
        level: 'Beginner → Advanced',
        enrolled: '2,200+',
        rating: '4.8',
        icon: BrainIcon,
        heroImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-green-500',
        gradientTo: 'to-blue-700',
        accent: 'green-300',
        badge: 'Popular',
        highlights: ['AI project labs', 'Python + ML', 'Model deployment', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – Python Programming Essentials',
                topics: [
                    { title: 'Python Basics', subtopics: [{ name: 'Syntax, data types & control flow' }, { name: 'Functions, modules & packages' }, { name: 'File handling & virtual environments' }] },
                    { title: 'OOP & Data Structures', subtopics: [{ name: 'Classes, inheritance & polymorphism' }, { name: 'Lists, dicts, sets & tuples' }, { name: 'Algorithms & complexity' }] },
                ],
            },
            {
                module: 'Module 2 – Data Science Foundations',
                topics: [
                    { title: 'Data Manipulation', subtopics: [{ name: 'NumPy & Pandas' }, { name: 'Data cleaning & feature engineering' }, { name: 'Exploratory data analysis' }] },
                    { title: 'Visualization', subtopics: [{ name: 'Matplotlib & Seaborn' }, { name: 'Plotly interactive charts' }, { name: 'Dashboarding basics' }] },
                ],
            },
            {
                module: 'Module 3 – Machine Learning',
                topics: [
                    { title: 'Supervised Learning', subtopics: [{ name: 'Regression & classification' }, { name: 'Decision trees & ensembles' }, { name: 'Model validation' }] },
                    { title: 'Unsupervised Learning', subtopics: [{ name: 'Clustering & dimensionality reduction' }, { name: 'PCA & anomaly detection' }, { name: 'Feature scaling' }] },
                ],
            },
            {
                module: 'Module 4 – AI Applications',
                topics: [
                    { title: 'Natural Language Processing', subtopics: [{ name: 'Text preprocessing & embeddings' }, { name: 'Sentiment analysis' }, { name: 'Chatbot fundamentals' }] },
                    { title: 'Computer Vision', subtopics: [{ name: 'Image processing basics' }, { name: 'CNNs for classification' }, { name: 'Object detection & transfer learning' }] },
                ],
            },
            {
                module: 'Module 5 – Deployment & MLOps',
                topics: [
                    { title: 'Model Deployment', subtopics: [{ name: 'Flask / FastAPI APIs' }, { name: 'Dockerise AI models' }, { name: 'Cloud deployment basics' }] },
                    { title: 'MLOps Practices', subtopics: [{ name: 'Versioning & monitoring' }, { name: 'Experiment tracking' }, { name: 'Automated retraining' }] },
                ],
            },
        ],
    },

    // ── 5. SOC Analyst ──
    {
        id: 'soc-analyst',
        title: 'SOC Analyst',
        tagline: 'Secure enterprise networks with SOC operations, monitoring, and incident response.',
        description:
            'Train to work in a Security Operations Center by mastering SIEM tools, threat hunting, incident triage, and automated response processes used by top security teams.',
        duration: '4 Months',
        level: 'Intermediate → Advanced',
        enrolled: '1,800+',
        rating: '4.7',
        icon: ShieldIcon,
        heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-orange-500',
        gradientTo: 'to-amber-900',
        accent: 'orange-300',
        badge: 'Career-ready',
        highlights: ['SIEM & SOC tools', 'Threat hunting', 'Incident response', 'Shift-based labs'],
        syllabus: [
            {
                module: 'Module 1 – SOC Fundamentals',
                topics: [
                    { title: 'SOC Roles & Processes', subtopics: [{ name: 'SOC Tier structure' }, { name: 'Incident lifecycle' }, { name: 'Alert triage methodology' }] },
                    { title: 'Security Monitoring', subtopics: [{ name: 'Log collection & parsing' }, { name: 'Event correlation' }, { name: 'Alert tuning' }] },
                ],
            },
            {
                module: 'Module 2 – SIEM & Threat Intelligence',
                topics: [
                    { title: 'SIEM Platforms', subtopics: [{ name: 'Splunk / ELK basics' }, { name: 'Rule creation & dashboards' }, { name: 'Threat detection engineering' }] },
                    { title: 'Threat Intelligence', subtopics: [{ name: 'TTPs & kill chain analysis' }, { name: 'IOC management' }, { name: 'Threat feed integration' }] },
                ],
            },
            {
                module: 'Module 3 – Incident Response',
                topics: [
                    { title: 'Investigation & Forensics', subtopics: [{ name: 'Endpoint triage' }, { name: 'Memory analysis basics' }, { name: 'Network packet inspection' }] },
                    { title: 'Playbooks & Reporting', subtopics: [{ name: 'Response playbook creation' }, { name: 'Incident reporting' }, { name: 'Post-incident review' }] },
                ],
            },
            {
                module: 'Module 4 – Automation & SOC Tools',
                topics: [
                    { title: 'SOAR & Automation', subtopics: [{ name: 'Playbook automation' }, { name: 'Alert enrichment' }, { name: 'Automated remediation' }] },
                    { title: 'Practical SOC Labs', subtopics: [{ name: 'Simulated security events' }, { name: 'Case management exercises' }, { name: 'Shift handoff scenarios' }] },
                ],
            },
        ],
    },

    // ── 6. VAPT & WAPT ──
    {
        id: 'vapt-wapt',
        title: 'VAPT & WAPT',
        tagline: 'Master vulnerability assessment and web app penetration testing.',
        description:
            'Learn how to assess infrastructure and web applications for real vulnerabilities, perform ethical penetration tests, and produce professional reports used by security teams.',
        duration: '4 Months',
        level: 'Intermediate → Advanced',
        enrolled: '1,700+',
        rating: '4.7',
        icon: ShieldIcon,
        heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-sky-600',
        gradientTo: 'to-slate-900',
        accent: 'sky-300',
        badge: 'Hands-on',
        highlights: ['Burp Suite labs', 'OWASP Top 10', 'Report writing', 'Red team practice'],
        syllabus: [
            {
                module: 'Module 1 – VAPT Fundamentals',
                topics: [
                    { title: 'Assessment Methodology', subtopics: [{ name: 'Reconnaissance & scoping' }, { name: 'Threat modelling' }, { name: 'Vulnerability classification' }] },
                    { title: 'Security Tools', subtopics: [{ name: 'Nmap, Nessus & OpenVAS' }, { name: 'Burp Suite workflow' }, { name: 'Zap & web proxies' }] },
                ],
            },
            {
                module: 'Module 2 – Web App Penetration Testing',
                topics: [
                    { title: 'OWASP Top 10', subtopics: [{ name: 'SQL injection & XSS' }, { name: 'CSRF, broken auth & insecure deserialization' }, { name: 'Security misconfiguration' }] },
                    { title: 'Web Hacking Techniques', subtopics: [{ name: 'Session hijacking' }, { name: 'File upload flaws' }, { name: 'API security testing' }] },
                ],
            },
            {
                module: 'Module 3 – Infrastructure Assessment',
                topics: [
                    { title: 'Network Pentesting', subtopics: [{ name: 'Network scanning & enumeration' }, { name: 'Service exploitation' }, { name: 'Post-exploitation basics' }] },
                    { title: 'Cloud & Application Security', subtopics: [{ name: 'Cloud asset discovery' }, { name: 'Container & API security' }, { name: 'Secure coding review' }] },
                ],
            },
            {
                module: 'Module 4 – Reporting & Remediation',
                topics: [
                    { title: 'Vulnerability Reporting', subtopics: [{ name: 'Risk rating & remediation steps' }, { name: 'Executive summary writing' }, { name: 'Proof-of-concept documentation' }] },
                    { title: 'Security Roadmaps', subtopics: [{ name: 'Fix prioritisation' }, { name: 'Pen-test retest planning' }, { name: 'Client communication' }] },
                ],
            },
        ],
    },

    // ── 7. Web Development ──
    {
        id: 'web-development',
        title: 'Web Development',
        tagline: 'Design beautiful, fast & accessible websites from scratch',
        description:
            'A comprehensive frontend-to-backend web development journey — HTML, CSS, JavaScript, React, Node.js, and databases. Build a professional portfolio and land your first dev job.',
        duration: '4 Months',
        level: 'Beginner → Intermediate',
        enrolled: '5,100+',
        rating: '4.8',
        icon: GlobeIcon,
        heroImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-purple-900',
        accent: 'purple-400',
        badge: 'Beginner Friendly',
        highlights: ['Portfolio projects', 'Figma to code', 'Job prep', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – HTML & CSS',
                topics: [
                    { title: 'HTML5 Essentials', subtopics: [{ name: 'Semantic elements & structure' }, { name: 'Forms, tables & media embeds' }, { name: 'Accessibility (ARIA) basics' }] },
                    { title: 'CSS & Styling', subtopics: [{ name: 'Box model, selectors & specificity' }, { name: 'Flexbox & CSS Grid' }, { name: 'Animations & transitions' }] },
                    { title: 'Responsive Design', subtopics: [{ name: 'Media queries & breakpoints' }, { name: 'Mobile-first workflow' }, { name: 'Tailwind CSS framework' }] },
                ],
            },
            {
                module: 'Module 2 – JavaScript',
                topics: [
                    { title: 'JS Fundamentals', subtopics: [{ name: 'Variables, scope & closures' }, { name: 'DOM manipulation & events' }, { name: 'Error handling & debugging' }] },
                    { title: 'ES6+ & Async JS', subtopics: [{ name: 'Arrow functions, destructuring & spread' }, { name: 'Promises, async/await & Fetch API' }, { name: 'Modules & bundlers' }] },
                    { title: 'TypeScript Basics', subtopics: [{ name: 'Types, interfaces & generics' }, { name: 'Strict mode & type guards' }, { name: 'TypeScript with React' }] },
                ],
            },
            {
                module: 'Module 3 – React & Ecosystem',
                topics: [
                    { title: 'React Core', subtopics: [{ name: 'Components, JSX & virtual DOM' }, { name: 'Hooks: useState, useEffect, useRef' }, { name: 'Context API & custom hooks' }] },
                    { title: 'Advanced React', subtopics: [{ name: 'React Router v6' }, { name: 'Performance: memo, useMemo, lazy' }, { name: 'Testing with React Testing Library' }] },
                    { title: 'Styling & Animation', subtopics: [{ name: 'Tailwind CSS in React' }, { name: 'Framer Motion animations' }, { name: 'Storybook component library' }] },
                ],
            },
            {
                module: 'Module 4 – Backend with Node.js',
                topics: [
                    { title: 'Node.js & Express', subtopics: [{ name: 'Event loop & non-blocking I/O' }, { name: 'REST API with Express' }, { name: 'Middleware & error handling' }] },
                    { title: 'Databases', subtopics: [{ name: 'MongoDB & Mongoose ODM' }, { name: 'MySQL / PostgreSQL with Sequelize' }, { name: 'Redis for caching' }] },
                    { title: 'Authentication & Security', subtopics: [{ name: 'JWT & session management' }, { name: 'bcrypt & password hashing' }, { name: 'CORS, rate limiting & Helmet' }] },
                ],
            },
            {
                module: 'Module 5 – Deployment & Projects',
                topics: [
                    { title: 'Version Control & CI/CD', subtopics: [{ name: 'Git branching & pull requests' }, { name: 'GitHub Actions deployment' }, { name: 'Code review best practices' }] },
                    { title: 'Hosting & Domains', subtopics: [{ name: 'Vercel, Netlify & Render' }, { name: 'Custom domain & SSL setup' }, { name: 'Performance & Lighthouse audits' }] },
                ],
            },
        ],
    },

    // ── 5. Data Science ──
    {
        id: 'data-science',
        title: 'Data Science',
        tagline: 'Turn raw data into insights that drive real business decisions',
        description:
            'A hands-on data science curriculum covering statistics, Python analytics, machine learning, and data visualisation. Build end-to-end data pipelines and present findings that impress stakeholders.',
        duration: '5 Months',
        level: 'Beginner → Advanced',
        enrolled: '2,400+',
        rating: '4.9',
        icon: DatabaseIcon,
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-teal-500',
        gradientTo: 'to-teal-800',
        accent: 'teal-400',
        badge: 'High ROI',
        highlights: ['Kaggle projects', 'Industry datasets', 'Capstone project', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – Python for Data Science',
                topics: [
                    { title: 'Python Essentials', subtopics: [{ name: 'NumPy arrays & vectorisation' }, { name: 'Pandas DataFrames & Series' }, { name: 'Matplotlib & Seaborn visualisation' }] },
                    { title: 'Data Wrangling', subtopics: [{ name: 'Handling missing & duplicate data' }, { name: 'Data merging, reshaping & pivoting' }, { name: 'Feature engineering basics' }] },
                ],
            },
            {
                module: 'Module 2 – Statistics & Probability',
                topics: [
                    { title: 'Descriptive Statistics', subtopics: [{ name: 'Mean, median, mode & variance' }, { name: 'Distributions & skewness' }, { name: 'Correlation & covariance' }] },
                    { title: 'Inferential Statistics', subtopics: [{ name: 'Hypothesis testing & p-values' }, { name: 'Confidence intervals & effect size' }, { name: 'A/B testing & chi-square tests' }] },
                    { title: 'Probability', subtopics: [{ name: 'Bayes theorem' }, { name: 'Probability distributions: Normal, Poisson, Binomial' }, { name: 'Monte Carlo simulations' }] },
                ],
            },
            {
                module: 'Module 3 – Machine Learning',
                topics: [
                    { title: 'Supervised Learning', subtopics: [{ name: 'Linear & logistic regression' }, { name: 'Decision trees & random forests' }, { name: 'SVM & KNN algorithms' }] },
                    { title: 'Unsupervised Learning', subtopics: [{ name: 'K-Means & hierarchical clustering' }, { name: 'PCA & dimensionality reduction' }, { name: 'Anomaly detection' }] },
                    { title: 'Model Evaluation', subtopics: [{ name: 'Confusion matrix, precision & recall' }, { name: 'Cross-validation & bias-variance' }, { name: 'Hyperparameter tuning (GridSearchCV)' }] },
                ],
            },
            {
                module: 'Module 4 – Advanced Analytics & Big Data',
                topics: [
                    { title: 'Time Series Analysis', subtopics: [{ name: 'Trend, seasonality & decomposition' }, { name: 'ARIMA & Prophet models' }, { name: 'Forecasting & backtesting' }] },
                    { title: 'Big Data Tools', subtopics: [{ name: 'Apache Spark & PySpark basics' }, { name: 'SQL on large datasets (Hive / BigQuery)' }, { name: 'ETL pipelines with Airflow' }] },
                    { title: 'Data Visualisation & Storytelling', subtopics: [{ name: 'Plotly & interactive dashboards' }, { name: 'Tableau / Power BI fundamentals' }, { name: 'Presenting data to non-technical audience' }] },
                ],
            },
            {
                module: 'Module 5 – Capstone & Deployment',
                topics: [
                    { title: 'ML Model Deployment', subtopics: [{ name: 'Flask / FastAPI model serving' }, { name: 'Dockerising ML models' }, { name: 'AWS SageMaker basics' }] },
                    { title: 'Capstone Project', subtopics: [{ name: 'End-to-end dataset analysis' }, { name: 'Model building & optimisation' }, { name: 'Dashboard presentation' }] },
                ],
            },
        ],
    },

    // ── 6. Artificial Intelligence ──
    {
        id: 'artificial-intelligence',
        title: 'Artificial Intelligence',
        tagline: 'Design, train & deploy intelligent systems using cutting-edge AI',
        description:
            'Go deep into the science and engineering of AI — from neural networks and deep learning to NLP, computer vision, and generative AI. Build portfolio-worthy projects that demonstrate real AI expertise.',
        duration: '6 Months',
        level: 'Intermediate → Expert',
        enrolled: '1,900+',
        rating: '4.9',
        icon: BrainIcon,
        heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1400&q=80',
        cardImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
        gradientFrom: 'from-violet-600',
        gradientTo: 'to-violet-900',
        accent: 'violet-400',
        badge: 'Future-proof',
        highlights: ['GPU compute access', 'Research projects', 'Paper reading club', 'Certificate'],
        syllabus: [
            {
                module: 'Module 1 – Foundations of AI & ML',
                topics: [
                    { title: 'AI Overview', subtopics: [{ name: 'History & categories of AI' }, { name: 'Narrow vs general vs super AI' }, { name: 'AI ethics & responsible AI' }] },
                    { title: 'Mathematics for AI', subtopics: [{ name: 'Linear algebra: vectors, matrices & eigenvalues' }, { name: 'Calculus: gradients & chain rule' }, { name: 'Probability & information theory' }] },
                    { title: 'Classical ML Recap', subtopics: [{ name: 'Supervised & unsupervised learning' }, { name: 'Feature selection & regularisation' }, { name: 'Ensemble methods' }] },
                ],
            },
            {
                module: 'Module 2 – Deep Learning',
                topics: [
                    { title: 'Neural Networks', subtopics: [{ name: 'Perceptrons & activation functions' }, { name: 'Backpropagation & gradient descent' }, { name: 'Batch normalisation & dropout' }] },
                    { title: 'Frameworks', subtopics: [{ name: 'TensorFlow 2.x & Keras API' }, { name: 'PyTorch tensors & autograd' }, { name: 'GPU training & mixed precision' }] },
                    { title: 'CNN – Computer Vision', subtopics: [{ name: 'Convolution, pooling & feature maps' }, { name: 'ResNet, VGG & EfficientNet' }, { name: 'Transfer learning & fine-tuning' }] },
                    { title: 'RNN & LSTM – Sequence Models', subtopics: [{ name: 'Vanishing gradient problem' }, { name: 'LSTM & GRU architectures' }, { name: 'Seq2Seq & attention mechanism' }] },
                ],
            },
            {
                module: 'Module 3 – Natural Language Processing',
                topics: [
                    { title: 'Text Preprocessing', subtopics: [{ name: 'Tokenisation, stemming & lemmatisation' }, { name: 'TF-IDF & word embeddings (Word2Vec)' }, { name: 'NLTK & spaCy libraries' }] },
                    { title: 'Transformer Architecture', subtopics: [{ name: 'Self-attention & multi-head attention' }, { name: 'BERT, GPT & T5 models' }, { name: 'Fine-tuning with HuggingFace' }] },
                    { title: 'NLP Applications', subtopics: [{ name: 'Sentiment analysis & text classification' }, { name: 'Named entity recognition (NER)' }, { name: 'Question answering & summarisation' }] },
                ],
            },
            {
                module: 'Module 4 – Generative AI',
                topics: [
                    { title: 'GANs', subtopics: [{ name: 'Generator & discriminator architecture' }, { name: 'DCGAN, StyleGAN & CycleGAN' }, { name: 'Mode collapse & training tricks' }] },
                    { title: 'Diffusion Models', subtopics: [{ name: 'Denoising diffusion probabilistic models' }, { name: 'Stable Diffusion & ControlNet' }, { name: 'Prompt engineering' }] },
                    { title: 'LLMs & RAG', subtopics: [{ name: 'GPT-4 / Llama fine-tuning' }, { name: 'Retrieval-augmented generation (RAG)' }, { name: 'LangChain & vector databases' }] },
                ],
            },
            {
                module: 'Module 5 – MLOps & Production AI',
                topics: [
                    { title: 'MLOps Pipeline', subtopics: [{ name: 'Experiment tracking with MLflow' }, { name: 'Model versioning & registry' }, { name: 'Continuous training pipelines' }] },
                    { title: 'Model Deployment', subtopics: [{ name: 'FastAPI model serving' }, { name: 'TorchServe & TensorFlow Serving' }, { name: 'Kubernetes for AI workloads' }] },
                    { title: 'AI Monitoring', subtopics: [{ name: 'Data drift & concept drift detection' }, { name: 'Model explainability (SHAP, LIME)' }, { name: 'A/B testing ML models in production' }] },
                ],
            },
        ],
    },
];

// ─── Syllabus Accordion ───────────────────────────────────────────────────────
const TopicRow: React.FC<{ topic: Topic }> = ({ topic }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-white/10 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex justify-between items-center px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
                <span className="text-white text-sm font-medium flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-secondary-400 flex-shrink-0" />
                    {topic.title}
                </span>
                <ChevronDownIcon className={`h-4 w-4 text-gray-400 flex-shrink-0 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <ul className="px-5 py-3 space-y-1.5 bg-white/[0.03]">
                    {topic.subtopics.map((st, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary-400 flex-shrink-0" />
                            {st.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const ModuleAccordion: React.FC<{ mod: Module; defaultOpen?: boolean }> = ({ mod, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border border-white/20 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex justify-between items-center px-5 py-4 bg-white/10 hover:bg-white/15 transition-colors text-left"
            >
                <span className="text-white font-bold text-sm">{mod.module}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-400">{mod.topics.length} topics</span>
                    <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {open && (
                <div className="px-4 py-4 space-y-2 bg-black/20">
                    {mod.topics.map((topic, i) => (
                        <TopicRow key={i} topic={topic} />
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Course Detail Modal ──────────────────────────────────────────────────────
const CourseModal: React.FC<{ course: Course; onClose: () => void }> = ({ course, onClose }) => {
    const Icon = course.icon;
    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl bg-gray-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Hero */}
                <div className="relative h-52 overflow-hidden">
                    <img src={course.heroImage} alt={course.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} opacity-70`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-white/20 text-white text-xs font-bold px-3 py-0.5 rounded-full">{course.badge}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white">{course.title}</h2>
                        <p className="text-white/80 text-sm mt-1">{course.tagline}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                        <span className="text-xl leading-none">&times;</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { icon: ClockIcon, label: 'Duration', value: course.duration },
                            { icon: ZapIcon, label: 'Level', value: course.level },
                            { icon: UsersIcon, label: 'Enrolled', value: course.enrolled },
                            { icon: StarIcon, label: 'Rating', value: course.rating + ' / 5' },
                        ].map(({ icon: MIcon, label, value }) => (
                            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                                <MIcon className="h-4 w-4 text-secondary-400 mx-auto mb-1" />
                                <div className="text-white font-bold text-sm">{value}</div>
                                <div className="text-gray-500 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{course.description}</p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                        {course.highlights.map((h) => (
                            <span key={h} className="flex items-center gap-1.5 bg-secondary-500/15 border border-secondary-500/30 text-secondary-300 text-xs px-3 py-1.5 rounded-full">
                                <CheckCircleIcon className="h-3 w-3" />{h}
                            </span>
                        ))}
                    </div>

                    {/* Syllabus */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-3 flex items-center gap-2">
                            <BookOpenIcon className="h-5 w-5 text-secondary-400" /> Course Syllabus
                        </h3>
                        <div className="space-y-2">
                            {course.syllabus.map((mod, i) => (
                                <ModuleAccordion key={i} mod={mod} defaultOpen={i === 0} />
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-white/10">
                        <Link
                            to="/contact"
                            onClick={onClose}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            <MailIcon className="h-4 w-4" /> Enrol Now
                        </Link>
                        <button
                            onClick={onClose}
                            className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard: React.FC<{ course: Course; onOpen: () => void }> = ({ course, onOpen }) => {
    const Icon = course.icon;
    return (
        <div className="group bg-white/5 border border-white/10 hover:border-white/30 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            {/* Card image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={course.cardImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${course.gradientFrom} ${course.gradientTo} opacity-60`} />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs bg-white/25 backdrop-blur-sm text-white font-bold px-2.5 py-0.5 rounded-full border border-white/30">
                        {course.badge}
                    </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1">
                    <StarIcon className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs font-bold">{course.rating}</span>
                </div>
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-white font-extrabold text-lg leading-tight">{course.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{course.tagline}</p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><ClockIcon className="h-3.5 w-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><UsersIcon className="h-3.5 w-3.5" />{course.enrolled}</span>
                    <span className="flex items-center gap-1"><ZapIcon className="h-3.5 w-3.5" />{course.level.split(' ')[0]}</span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                    {course.highlights.slice(0, 3).map((h) => (
                        <span key={h} className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{h}</span>
                    ))}
                </div>

                <button
                    onClick={onOpen}
                    className={`mt-1 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} hover:opacity-90 transition-all`}
                >
                    View Syllabus <ArrowRightIcon className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const CoursesPage: React.FC = () => {
    const [activeCourse, setActiveCourse] = useState<Course | null>(null);

    return (
        <div className="bg-gradient-to-b from-primary-950 via-gray-950 to-black min-h-screen text-white">

            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-gray-950/80 to-black/90" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
                    <span className="inline-block bg-secondary-500/20 text-secondary-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-secondary-500/30 mb-6">
                        Parmy Learning
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Industry-Ready
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-primary-300">
                            Courses & Certifications
                        </span>
                    </h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
                        Structured, mentor-led programs designed to take you from concept to career — with real projects, live sessions, and a certificate employers trust.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-400">
                        {[['16,900+', 'Students Enrolled'], ['4.8', 'Average Rating'], ['100%', 'Online & Flexible'], ['9', 'Expert-led Courses']].map(([val, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl font-extrabold text-secondary-400">{val}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-white mb-3">Our Courses</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Click any course to explore the full syllabus with detailed topics and subtopics.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COURSES.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onOpen={() => setActiveCourse(course)}
                        />
                    ))}
                </div>
            </section>

            {/* Why Learn with Us */}
            <section className="bg-white/5 border-y border-white/10 py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white text-center mb-10">Why Learn with Parmy?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: UsersIcon, title: 'Expert Mentors', desc: 'Learn from practitioners with 10+ years of real industry experience.' },
                            { icon: BookOpenIcon, title: 'Updated Syllabus', desc: 'Carefully sequenced modules from fundamentals to advanced topics.' },
                            { icon: ZapIcon, title: 'Live Projects', desc: 'Work on real-world problems that go straight into your portfolio.' },
                            { icon: AwardIcon, title: 'Global Certifications', desc: 'Earn a certificate trusted by 500+ hiring partners across India and beyond.' },
                        ].map(({ icon: IIcon, title, desc }) => (
                            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-white/25 transition-colors">
                                <div className="h-12 w-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mx-auto mb-4">
                                    <IIcon className="h-6 w-6 text-secondary-400" />
                                </div>
                                <h3 className="text-white font-bold mb-2">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 overflow-hidden text-center px-4">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 to-gray-950/95" />
                </div>
                <div className="relative max-w-2xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Ready to upskill?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Talk to our course advisors and find the program that fits your goals and schedule.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg"
                        >
                            <MailIcon className="h-5 w-5" /> Enquire Now
                        </Link>
                        <Link
                            to="/our-services"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
                        >
                            View All Services <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Course Detail Modal */}
            {activeCourse && (
                <CourseModal course={activeCourse} onClose={() => setActiveCourse(null)} />
            )}
        </div>
    );
};

export default CoursesPage;
