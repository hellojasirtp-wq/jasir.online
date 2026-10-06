export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  projects?: {
    name: string;
    description: string;
    points: string[];
    technologies: string[];
  }[];
  description?: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  coreSkills: {
    category: string;
    skills: string[];
  }[];
  experience: ExperienceItem[];
  education: EducationItem[];
  languages: string[];
}

export const RESUME_DATA: ResumeData = {
  name: "JASIR T P",
  title: "Senior Software Engineer | Frontend Engineer | React.js / Next.js",
  location: "Calicut, Kerala, India",
  phone: "+91 701 2548 701",
  email: "hellojasirtp@gmail.com",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  summary:
    "Senior Software Engineer / Frontend Engineer with 6+ years of experience building enterprise-scale web applications, Single Page Applications (SPAs), admin dashboards, SaaS platforms, and reusable UI systems. Strong expertise in React.js, JavaScript, TypeScript, REST API integration, component-driven architecture, and frontend architecture. Hands-on experience with Micro Frontend Architecture, Module Federation, design systems, performance optimization, Agile/Scrum development, and cloud-integrated applications. Experienced in collaborating with international clients and cross-functional teams to translate business requirements into scalable technical solutions.",
  coreSkills: [
    {
      category: "Frontend Development",
      skills: [
        "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "React Hooks",
        "Redux Toolkit", "Context API", "TanStack", "Zustand", "React Query",
        "Micro Frontend Architecture", "Module Federation (Webpack 5, Vite)",
        "HTML5", "CSS3", "SCSS/Sass", "Tailwind CSS", "Ant Design", "Material UI",
        "Bootstrap", "Chakra UI", "NextUI", "Framer Motion", "Three.js", "Storybook", "SPA"
      ]
    },
    {
      category: "Cloud & Deployment",
      skills: ["AWS S3", "CI/CD Pipelines", "Cloud-Integrated Frontend Applications", "Amazon Cognito"]
    },
    {
      category: "Full Stack Development",
      skills: ["Node.js", "Express.js", "MongoDB", "REST API Development", "API Integration", "Authentication & Authorization", "JWT"]
    },
    {
      category: "Rendering & Performance",
      skills: ["SSR", "CSR", "SSG", "ISR", "Component-driven Architecture", "Performance Optimization", "Responsive Design", "DOM", "Accessibility (a11y)"]
    },
    {
      category: "Testing & Quality",
      skills: ["Vitest", "React Testing Library", "Cypress", "Jest", "Storybook", "Unit Testing", "Component Testing", "Integration Testing", "End-to-End Testing", "API Mocking", "Test Automation", "Regression Testing", "Code Reviews", "Debugging", "Performance Testing"]
    },
    {
      category: "Engineering Practices",
      skills: ["REST APIs", "Microservices Integration", "JWT Authentication", "Firebase Auth", "Code Reviews", "Performance Optimization", "Debugging", "Production Monitoring", "Agile/Scrum"]
    },
    {
      category: "Version Control & Collaboration",
      skills: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Slack", "Microsoft Teams", "Trello", "Notion"]
    },
    {
      category: "Platform APIs & SDKs",
      skills: ["WhatsApp Business API", "Google Maps & Location APIs", "Payment Gateways (Razorpay, PayPal, Stripe)", "Auth (Cognito, Firebase Auth, JWT)"]
    },
    {
      category: "AI-Assisted Development",
      skills: ["GitHub Copilot", "Claude Code", "ChatGPT", "Cursor", "Antigravity IDE", "AI-assisted code generation", "Debugging", "Refactoring", "Unit test generation", "Documentation", "Code review"]
    }
  ],
  experience: [
    {
      company: "Aufait Technologies",
      role: "Senior Software Engineer",
      period: "09/2023 – 08/2026",
      location: "Calicut, Kerala, India",
      projects: [
        {
          name: "City of Johannesburg (COJ) — Admin Panel Platform",
          description: "Enterprise incident management and municipal administration platform.",
          points: [
            "Pikitup Incident Management Panel: Developed a full-featured admin dashboard for municipal waste and service teams, enabling staff to create, triage, assign, escalate, and close incidents through streamlined digital workflows.",
            "Designed the UI to support real-time ticket tracking, status updates, and SLA monitoring, while integrating role-based access controls so teams only interacted with relevant tasks and data, improving operational response and coordination.",
            "City Information & User Management Panel: Delivered admin tools for user management and content publishing with approvals, analytics, and scalable CRUD features supporting large datasets.",
            "Implemented unit and component testing using Vitest and React Testing Library, covering reusable components, hooks, user interactions, form validations, and critical business logic to improve application reliability.",
            "Built and maintained reusable component documentation and interactive test scenarios with Storybook, helping the team validate UI components in isolation and maintain consistency across the application."
          ],
          technologies: ["React.js", "TypeScript", "JavaScript", "Micro Frontend Architecture", "Module Federation (Webpack 5)", "REST APIs", "Microservices", "HTML5", "CSS3", "Tailwind CSS", "Vitest", "React Testing Library", "Cypress", "Storybook", "AWS S3", "CI/CD pipelines", "cloud-integrated frontend applications", "Amazon Cognito"]
        },
        {
          name: "SaaS Design System (dessign.systems)",
          description: "Enterprise SaaS design token and component system with Figma synchronisation.",
          points: [
            "Developed a SaaS-based design system with Figma integration, custom domain support, type-scale generation, and real-time notifications, including core design tokens and a large component library with a production-ready Figma file."
          ],
          technologies: ["HTML", "CSS", "React 19", "JavaScript", "Pusher", "SDK"]
        },
        {
          name: "Triveni Turbine Ltd — Engineer Portal & Admin Panel",
          description: "Engineering solver configuration and model execution platform.",
          points: [
            "Built the engineer portal and admin panel with solver configuration, IDE-style model execution, a DXF viewer, and local data download/management tools."
          ],
          technologies: ["HTML", "CSS", "Tailwind", "React", "JavaScript", "Three.js"]
        },
        {
          name: "Olo — Admin Panel (Lead Developer)",
          description: "Unified operations control center.",
          points: [
            "Built the end-to-end Olo admin panel covering orders, services, users, vehicles, wallets, rewards, analytics, and roles, enabling complete operational control from a unified dashboard."
          ],
          technologies: ["HTML", "CSS", "Tailwind", "React", "JavaScript"]
        },
        {
          name: "Click4Marry.com — Portal & Admin Panel (Lead Developer)",
          description: "Large-scale matchmaking user portal and backoffice operations.",
          points: [
            "Led development of both the user portal and admin panel for a large-scale matchmaking platform."
          ],
          technologies: ["HTML", "CSS", "Tailwind", "React", "JavaScript", "Firebase", "Chat", "React Native"]
        }
      ],
      description: [
        "Led frontend development for the U25 UI project under Q8Cars, delivering responsive, production-ready features.",
        "Supported the wider engineering team through code reviews, mentoring junior developers, and promoting best practices in React and modern tooling.",
        "Assisted multiple squads with critical production troubleshooting, including SSL and deployment issues for Sugoid, a Japan-based client project, helping unblock releases and maintain system stability."
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "Micro Frontends", "Tailwind CSS", "Vitest", "Storybook", "AWS"]
    },
    {
      company: "Neoito",
      role: "Software Developer",
      period: "06/2021 – 08/2023",
      location: "Ernakulam, Kerala, India",
      description: [
        "Contributed to multiple client and internal projects across real estate, SaaS, AI, and logistics domains.",
        "Led frontend development for PropertyOK, building the admin panel and core UI workflows to support real estate operations and team activities.",
        "Served as a developer on Happile.io, enhancing a WhatsApp Business API platform used to automate marketing, sales, and customer support interactions.",
        "Built key features for NextPort, an AI-driven shipping and logistics platform, focusing on the admin interface and operational dashboards.",
        "Supported internal initiatives including performance monitoring tools and time management applications, collaborating across teams to improve engineering productivity and delivery efficiency."
      ],
      technologies: ["HTML", "CSS", "Tailwind", "React", "JavaScript", "Next.js", "Bootstrap", "Vue.js", "React Native"]
    },
    {
      company: "Talrop Pvt Ltd",
      role: "Software Developer",
      period: "07/2020 – 05/2021",
      location: "Ernakulam, Kerala, India",
      description: [
        "Developed and delivered end-to-end product experiences for Steyp, an EdTech platform empowering students to become skilled engineers and scientists.",
        "Conducted offline and online Robotics/IoT classes, training 100+ students."
      ],
      technologies: ["HTML", "CSS", "Tailwind", "React", "JavaScript", "Next.js", "Bootstrap", "Vue.js", "React Native"]
    }
  ],
  education: [
    {
      degree: "M.Sc. in Computer Science",
      institution: "University of Calicut",
      period: "2018 – 2020"
    },
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "University of Calicut",
      period: "2014 – 2017"
    }
  ],
  languages: ["English", "Malayalam"]
};
