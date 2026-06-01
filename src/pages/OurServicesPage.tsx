import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BriefcaseIcon, FileTextIcon, ShieldCheckIcon, UsersIcon,
    CheckCircleIcon, ArrowRightIcon, ChevronDownIcon, StarIcon,
    ClockIcon, AwardIcon, PhoneIcon, MailIcon, GlobeIcon,
    TrendingUpIcon, BookOpenIcon, ZapIcon, TargetIcon,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQ { q: string; a: string; }
interface ServiceSection {
    id: string;
    icon: React.FC<{ className?: string }>;
    title: string;
    tagline: string;
    description: string;
    heroImage: string;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
    features: string[];
    highlights: { icon: React.FC<{ className?: string }>; label: string; value: string }[];
    faqs: FAQ[];
    sideImages: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: ServiceSection[] = [
    {
        id: 'internships',
        icon: BriefcaseIcon,
        title: 'Internship Programs',
        tagline: 'Launch Your Career with Real-World Experience',
        description:
            'Our structured internship programs bridge the gap between academic learning and professional excellence. We partner with top universities and hand-pick driven students to work on live projects, guided by industry veterans—giving you a competitive edge before you even graduate.',
        heroImage:
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'secondary-400',
        gradientFrom: 'from-secondary-600',
        gradientTo: 'to-secondary-800',
        features: [
            'Paid 3–6 month structured programs',
            'Mentorship from senior engineers & managers',
            'Live project ownership from day one',
            'Weekly 1-on-1 performance reviews',
            'Completion certificate & LinkedIn recommendation',
            'Full-time conversion for top performers',
            'Flexible remote / hybrid arrangements',
            'Access to internal learning library',
        ],
        highlights: [
            { icon: UsersIcon, label: 'Interns Trained', value: '500+' },
            { icon: TrendingUpIcon, label: 'Full-time Conversion', value: '68%' },
            { icon: StarIcon, label: 'Satisfaction Score', value: '4.9 / 5' },
            { icon: AwardIcon, label: 'Industry Partners', value: '40+' },
        ],
        faqs: [
            { q: 'Who can apply for an internship?', a: 'Any undergraduate or postgraduate student in engineering, business, or design. We also accept recent graduates within 12 months of graduation.' },
            { q: 'Are internships paid?', a: 'Yes. All internships carry a competitive stipend benchmarked to industry standards based on skill level and duration.' },
            { q: 'Can I intern remotely?', a: 'Absolutely. We offer fully remote, hybrid, and on-site tracks depending on the project and your location.' },
        ],
        sideImages: [
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'paperwork',
        icon: FileTextIcon,
        title: 'Paperwork & Documentation',
        tagline: 'Precision Documentation for Every Stage of Your Business',
        description:
            'From compliance filings and legal drafts to technical manuals and corporate reports, our documentation specialists produce accurate, professionally formatted paperwork that keeps your business moving. We understand regulatory nuances across industries so you can focus on growth, not paperwork.',
        heroImage:
            'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'blue-400',
        gradientFrom: 'from-blue-600',
        gradientTo: 'to-blue-900',
        features: [
            'Business registration & compliance filing',
            'Contract drafting and legal documentation',
            'Technical writing & API documentation',
            'HR policy manuals and employee handbooks',
            'Grant proposals & funding applications',
            'ISO / ISO 27001 document management',
            'Annual report & board presentation decks',
            'Audit-ready record keeping systems',
        ],
        highlights: [
            { icon: FileTextIcon, label: 'Documents Processed', value: '10,000+' },
            { icon: ShieldCheckIcon, label: 'Accuracy Rate', value: '99.8%' },
            { icon: ClockIcon, label: 'Avg. Turnaround', value: '48 hrs' },
            { icon: GlobeIcon, label: 'Jurisdictions Covered', value: '25+' },
        ],
        faqs: [
            { q: 'Do you handle legal documents?', a: 'We produce legal-quality drafts reviewed by qualified legal advisors. For jurisdiction-specific filings, we work alongside your registered attorney.' },
            { q: 'How secure is my data?', a: 'All documents are handled under strict NDA, stored on encrypted servers, and permanently deleted post-project upon request.' },
            { q: 'What industries do you serve?', a: 'Healthcare, fintech, EdTech, manufacturing, logistics, real estate, and more.' },
        ],
        sideImages: [
            'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'plagiarism',
        icon: ShieldCheckIcon,
        title: 'Plagiarism & Integrity Services',
        tagline: 'Protect Your Intellectual Property & Academic Integrity',
        description:
            'Our advanced plagiarism detection and content-integrity services safeguard your academic work, research papers, corporate publications, and digital content. We combine AI-powered scanning with expert human review to deliver thorough, actionable reports that meet the standards of top universities and publishers worldwide.',
        heroImage:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'purple-400',
        gradientFrom: 'from-purple-600',
        gradientTo: 'to-purple-900',
        features: [
            'Deep-web & academic database scanning (50+ databases)',
            'AI-generated content detection',
            'Detailed similarity report with source URLs',
            'Paraphrase & mosaic plagiarism detection',
            'Self-plagiarism analysis for republication',
            'Turnitin, iThenticate & Copyscape integration',
            'Expert editorial review & rewrite suggestions',
            'Bulk submission discounts for institutions',
        ],
        highlights: [
            { icon: BookOpenIcon, label: 'Documents Checked', value: '250K+' },
            { icon: ShieldCheckIcon, label: 'Databases Scanned', value: '50+' },
            { icon: ZapIcon, label: 'Report Delivery', value: '< 2 hrs' },
            { icon: AwardIcon, label: 'University Partners', value: '120+' },
        ],
        faqs: [
            { q: 'Which plagiarism databases do you use?', a: 'We scan 50+ sources including CrossRef, ProQuest, IEEE Xplore, PubMed, Google Scholar cache, and billions of live web pages.' },
            { q: 'Can you help reduce plagiarism after detection?', a: 'Yes. Our editorial team can paraphrase and restructure flagged sections while preserving your original meaning.' },
            { q: 'Is the service suitable for corporate use?', a: 'Absolutely. We help marketing teams, publishers, and legal departments verify content originality before publication.' },
        ],
        sideImages: [
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'corporate-training',
        icon: UsersIcon,
        title: 'Corporate Training',
        tagline: 'Upskill Your Workforce for the Digital Era',
        description:
            "We design and deliver high-impact corporate training programs tailored to your team's skill gaps and business goals. From technical bootcamps in cloud computing and AI to soft-skills workshops on leadership and communication, our trainers bring real industry experience to every session — online, on-site, or blended.",
        heroImage:
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        accentColor: 'orange-400',
        gradientFrom: 'from-orange-500',
        gradientTo: 'to-orange-800',
        features: [
            'Custom curriculum design & skills gap analysis',
            'Technical tracks: Cloud, DevOps, AI/ML, Cybersecurity',
            'Leadership & management development programs',
            'Communication, presentation & negotiation skills',
            'Agile & Scrum practitioner certification prep',
            'Live instructor-led + self-paced LMS delivery',
            'Post-training assessment & ROI reporting',
            'Team-based workshops & hackathons',
        ],
        highlights: [
            { icon: UsersIcon, label: 'Professionals Trained', value: '8,000+' },
            { icon: TargetIcon, label: 'Training Completion', value: '94%' },
            { icon: TrendingUpIcon, label: 'Skill Improvement', value: '3.2×' },
            { icon: AwardIcon, label: 'Corporate Clients', value: '200+' },
        ],
        faqs: [
            { q: 'Can programs be customized for our industry?', a: 'Yes. We conduct a pre-engagement skills audit and co-design a curriculum aligned with your sector and strategic goals.' },
            { q: 'What is the minimum group size?', a: 'We accommodate groups of 5 to 500+. Smaller cohorts receive more personalized coaching.' },
            { q: 'Do you offer certification?', a: 'Participants receive Parmy-certified completion certificates. We also offer prep programs for AWS, Google Cloud, PMI, and other third-party certifications.' },
        ],
        sideImages: [
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
        ],
    },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const FAQItem: React.FC<{ faq: FAQ; open: boolean; onToggle: () => void }> = ({ faq, open, onToggle }) => (
    <div className="border border-white/10 rounded-xl overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center px-5 py-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
        >
            <span className="text-white font-medium text-sm">{faq.q}</span>
            <ChevronDownIcon className={`h-4 w-4 text-gray-400 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
            <div className="px-5 py-4 text-sm text-gray-300 bg-white/[0.03] leading-relaxed">
                {faq.a}
            </div>
        )}
    </div>
);

const ServiceSection: React.FC<{ service: ServiceSection; index: number }> = ({ service, index }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const Icon = service.icon;
    const isEven = index % 2 === 0;

    return (
        <section id={service.id} className="relative py-20 border-b border-white/10 scroll-mt-24">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                <img
                    src={service.heroImage}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradientFrom} ${service.gradientTo} opacity-75`} />
                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-white/70 text-sm font-semibold tracking-widest uppercase">Parmy Services</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{service.title}</h2>
                    <p className="mt-2 text-white/80 text-lg max-w-2xl">{service.tagline}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main content grid */}
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Text side */}
                    <div className={isEven ? '' : 'lg:col-start-2'}>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">{service.description}</p>

                        {/* Features */}
                        <h3 className="text-white font-bold text-xl mb-5">What's Included</h3>
                        <ul className="grid sm:grid-cols-2 gap-3 mb-10">
                            {service.features.map((f) => (
                                <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircleIcon className="h-4 w-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        {/* Highlights */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                            {service.highlights.map((h) => {
                                const HIcon = h.icon;
                                return (
                                    <div key={h.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                        <HIcon className="h-5 w-5 text-secondary-400 mx-auto mb-2" />
                                        <div className="text-white font-bold text-lg">{h.value}</div>
                                        <div className="text-gray-400 text-xs mt-0.5">{h.label}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* FAQs */}
                        <h3 className="text-white font-bold text-xl mb-4">Frequently Asked Questions</h3>
                        <div className="space-y-2">
                            {service.faqs.map((faq, i) => (
                                <FAQItem
                                    key={i}
                                    faq={faq}
                                    open={openFaq === i}
                                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Image side */}
                    <div className={`space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                        {service.sideImages.map((src, i) => (
                            <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? 'h-64' : 'h-48'} group shadow-lg`}>
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                            </div>
                        ))}

                        {/* CTA card */}
                        <div className={`bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} rounded-2xl p-6 text-white`}>
                            <h4 className="font-bold text-lg mb-2">Ready to get started?</h4>
                            <p className="text-white/80 text-sm mb-4">
                                Talk to our team and get a personalised quote within 24 hours.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                            >
                                Contact Us <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const OurServicesPage: React.FC = () => {
    return (
        <div className="bg-gradient-to-b from-primary-950 via-gray-950 to-black min-h-screen text-white">

            {/* ── Page Hero ── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-gray-950/80 to-black/90" />
                </div>
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
                    <span className="inline-block bg-secondary-500/20 text-secondary-300 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-secondary-500/30 mb-6">
                        Our Services
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Solutions Built for
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 to-primary-300">
                            Every Business Need
                        </span>
                    </h1>
                    <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                        From nurturing fresh talent through internships to fortifying documents with plagiarism integrity and empowering teams with world-class training — we've got you covered.
                    </p>

                    {/* Quick-jump pill nav */}
                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        {SERVICES.map((s) => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200"
                                >
                                    <Icon className="h-4 w-4" />
                                    {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Why Choose Us strip ── */}
            <div className="bg-white/5 border-y border-white/10 py-10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '12+', label: 'Years of Excellence' },
                        { value: '500+', label: 'Happy Clients' },
                        { value: '50+', label: 'Expert Team Members' },
                        { value: '98%', label: 'Client Retention Rate' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <div className="text-3xl font-extrabold text-secondary-400">{stat.value}</div>
                            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Service Sections ── */}
            {SERVICES.map((service, i) => (
                <ServiceSection key={service.id} service={service} index={i} />
            ))}

            {/* ── Bottom CTA ── */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        className="w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 to-gray-950/95" />
                </div>
                <div className="relative max-w-3xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Not sure which service fits you?</h2>
                    <p className="text-gray-300 text-lg mb-8">
                        Our advisors will assess your needs and recommend the right combination — at no obligation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg">
                            <MailIcon className="h-5 w-5" /> Email Us
                        </Link>
                        <a href="tel:+911234567890" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all">
                            <PhoneIcon className="h-5 w-5" /> Call Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurServicesPage;
