export const profile = {
  name: 'Madelein Jordaan',
  title: 'Front-End Engineer, Process Automation & AI Integration',
  location: 'Mellieħa, Malta',
  workAuth: 'Authorized to work in Malta (Single Permit holder)',
  email: 'madeleinjordaan92@gmail.com',
  linkedin: 'https://www.linkedin.com/in/madelein-jordaan-6b7757218',
  siteUrl: 'https://deathbywaffels.github.io/online-cv/',
  github: 'https://github.com/deathbywaffels',
  summary:
    "Highly adaptable, analytical, and execution-focused engineer specializing in Front-End Development, Business Process Automation, and AI Integration. Proven track record of bridging high-level business strategy with robust technical execution — orchestrating complex BPMN 2.0 architectures, building high-performance React applications, and developing custom AI agents and proof-of-concept tools that extend team capacity and demonstrate automation opportunities to clients.",
}

export const skillGroups = [
  {
    title: 'Process Automation & Backend',
    skills: [
      'BPMN 2.0 (Flowable Orchestration)',
      'JavaScript (ES6+), Node.js, Express, Python, C++',
      'GraphQL & RESTful API Architecture',
      'Relational Databases (PostgreSQL, Oracle SQL, MySQL, MongoDB)',
      'DevOps (Docker, Linux VPS, Server Stack Setup)',
    ],
  },
  {
    title: 'Frontend & Graphics',
    skills: [
      'React, Redux, React Native, TypeScript, Tailwind CSS',
      'Material UI, Bootstrap, Sass, Framer Motion',
      '3D Graphics (WebGL, Three.js)',
      'Data Visualization (D3.js, Chart.js, ApexCharts, Grafana)',
      'Desktop UI Layout (Qt Designer)',
    ],
  },
  {
    title: 'AI Integration & Automation',
    skills: [
      'Custom Claude agents for QA, evaluation & ticket automation',
      'LLM API integration (bring-your-own-API-key architecture)',
      'Multimodal AI integration (Google Gemini Vision)',
      'AI proof-of-concept development for enterprise clients',
    ],
  },
  {
    title: 'Additional Tools & Platforms',
    skills: [
      'C#, Delphi',
      'Firebase, Prisma ORM',
      'Unity, Unreal Engine, Godot',
      'PyTorch',
      'Git, GitHub, GitLab',
    ],
  },
]

export const projects = [
  {
    title: 'DualTrack',
    description:
      "A two-sided job-search platform — candidates manage their own application pipeline, employers manage their own candidate pipeline. Sourcing and AI-assisted matching (bring-your-own Anthropic API key) feed each side's board rather than being the product itself.",
    stack: ['React 19', 'Node.js / Express', 'PostgreSQL (Prisma)', 'Docker', 'Anthropic API'],
    github: 'https://github.com/deathbywaffels/open-pipeline',
    demo: 'dualtrack',
  },
  {
    title: 'Glimmer',
    description:
      'A mobile app that turns a photo of a messy room into a cleaning checklist — Gemini Vision analyzes the image, generates the tasks, then verifies completion from a second photo. Bring-your-own Gemini API key, key stored on-device only.',
    stack: ['React Native (Expo)', 'Google Gemini API', 'Firebase'],
    demo: 'glimmer',
    live: 'https://glimmer-cleaning-demo.netlify.app',
  },
  {
    title: 'This Site',
    description:
      'The CV site you\'re looking at right now — hand-built with React, a custom SVG workflow animation, D3.js, and a from-scratch Three.js WebGL scene, no charting or animation libraries beyond those two.',
    stack: ['React', 'D3.js', 'Three.js', 'Vite'],
    github: 'https://github.com/deathbywaffels/online-cv',
    // Self-referential on the live site (nice touch, visitor is already
    // looking at it) but redundant/space-wasting on a printed résumé.
    includeInResume: false,
  },
]

export const experience = [
  {
    role: 'Front-End Developer / Business Process Engineer',
    company: 'Mi-C3 International',
    location: 'Malta',
    period: 'July 2024 – Present',
    points: [
      'Architect, implement, and maintain scalable UI components using JavaScript, React, Redux, Material UI, HTML5, and CSS3.',
      'Bridge complex enterprise web systems using Node.js, GraphQL integrations, and RESTful API endpoints.',
      'Profile front-end performance metrics, reducing bundle sizes, managing asynchronous states, and resolving rendering bottlenecks.',
      'Author internal technical documentation for frontend components, modular design patterns, and state-management schemas.',
      'Manage code branches, continuous integration, and peer code reviews inside GitLab.',
      'Build custom Claude-based agents to automate QA, evaluation, and ticket-creation workflows, extending team capacity.',
      'Deliver AI proof-of-concept demos for clients — including an AI-driven energy-cost-reduction analysis — to support solution scoping.',
    ],
  },
  {
    role: 'Junior Business Process Engineer',
    company: 'Mi-C3 International',
    location: 'Malta',
    period: 'January 2023 – June 2024',
    points: [
      'Developed and shipped production applications by designing logical workflows using BPMN 2.0 / Flowable engines integrated via JavaScript, HTML, CSS, and GraphQL.',
      "Built a NOC and customer incident management application for a major European telecommunications company, using the company's proprietary Affectli platform.",
      'Built an IT ticketing system and a water quality monitoring application for an Australian water utility company.',
      'Engineered live monitoring data visualizations using Grafana to showcase operational metrics to clients.',
      'Assisted with training, code review, and operational onboarding of newly recruited Business Process Engineers.',
    ],
  },
  {
    role: 'Graduate Business Process Engineer',
    company: 'Mi-C3 International',
    location: 'Malta',
    period: 'August 2022 – December 2022',
    points: [
      'Completed fast-tracked enterprise platform onboarding, writing backend JavaScript hooks and custom GraphQL data hooks to connect system models to client interfaces using BPMN workflows.',
    ],
  },
]

export const education = [
  {
    qualification: 'Bachelor of Science (BSc) in Computing',
    institution: 'University of South Africa (UNISA)',
    period: 'Expected Graduation: November 2026',
    details:
      'Rigorous, highly mathematical distance-learning computer science track, maintained part-time alongside full-time software engineering work. Currently completing the final 2 subjects.',
    highlights: [
      'Software Engineering & Architecture: Advanced Object-Oriented Analysis, Data Structures (C++/Qt), Systems Development, Software Project Management, Human-Computer Interaction I & II.',
      'Infrastructure, AI & Visual Math: Computer Graphics (WebGL/Three.js render pipelines), Advanced Database Design (Oracle SQL I–III), Computer Networks, Techniques of Artificial Intelligence, Linear Algebra, Formal Logic, Theoretical Computer Science.',
    ],
  },
  {
    qualification: 'Front-End Engineer Professional Certificate',
    institution: 'Codecademy',
    period: 'Completed September 2024',
    details:
      'Comprehensive training in algorithmic analysis, web architecture, React state lifecycle, and advanced JavaScript.',
  },
]

export const achievements = [
  {
    title: 'Grand Prize Winner, South Africa — Petronas Fluid Art Movement',
    description:
      "Won the national round of Petronas' Fluid Art Movement digital engineering design competition; awarded an all-expenses-paid trip to New York City and Montreal, including attending the Grand Prix.",
  },
  {
    title: 'Government Security Vetting',
    description:
      'Successfully completed a comprehensive background verification process conducted by a highly established South African government security agency.',
  },
  {
    title: 'International Logistics Volunteerism',
    description:
      'Deployed to remote areas in Malawi to coordinate logistical resource routing and nutritional planning for vulnerable youth centers under constrained infrastructure.',
  },
  {
    title: 'Self-Taught Linux Server Administration',
    description:
      'Started by running community Minecraft, Teeworlds, and ARK servers on MWEB GameZone; grew this into independently hosting and maintaining Linux VPS game servers for friends and South African players.',
  },
  {
    title: 'Volunteer Educator',
    description:
      'Taught weekly Sunday school classes, developing structured lesson plans and communication skills for diverse age groups.',
  },
]
