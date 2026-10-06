import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Award, Laptop, Code, ChevronRight
} from 'lucide-react';

interface TimelineItem {
  year: string;
  company: string;
  role: string;
  description: string;
  skills: string[];
  color: string;
}

export const About: React.FC = () => {
  const timeline: TimelineItem[] = [
    {
      year: '2017',
      company: 'Started Career Journey',
      role: 'Aspiring Developer',
      description: 'Discovered passion for software engineering, diving deep into Web APIs, JavaScript algorithms, and responsive interfaces.',
      skills: ['HTML5', 'CSS3', 'JavaScript ES6'],
      color: '#FF4D8D', // Accent
    },
    {
      year: '2020 - 2021',
      company: 'Talrop',
      role: 'Associate Software Engineer',
      description: 'Worked on educational SaaS tools, local logistics platforms, and core web products. Focused on clean layouts and dynamic state rendering.',
      skills: ['React', 'Redux', 'Bootstrap', 'Git'],
      color: '#6C63FF', // Primary
    },
    {
      year: '2021 - 2023',
      company: 'NeoITO',
      role: 'Software Engineer',
      description: 'Built scalable logistics systems, administrative control panels, and custom IoT dashboards. Spearheaded standard React state patterns.',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Redux Toolkit', 'REST APIs'],
      color: '#00D4FF', // Secondary
    },
    {
      year: '2023 - Present',
      company: 'Aufait Technologies',
      role: 'Senior Software Engineer',
      description: 'Lead frontend architect. Design enterprise-grade platforms (City of Johannesburg Admin Panel, Pikitup Admin Panel, Click4Marry Portals, TTL Solver Wrapper, EmployedIn Portal, TaskFlow CRM, Triveni Turbine), internal UI design systems, and fast SaaS portals.',
      skills: ['Next.js', 'React 19', 'Three.js', 'Framer Motion', 'Zustand', 'React Query'],
      color: '#00FFB3', // Highlight
    },
  ];

  const stats = [
    { label: 'Years Experience', value: '6+', icon: Calendar, color: 'text-primary' },
    { label: 'SaaS & Enterprise Apps', value: '15+', icon: Laptop, color: 'text-secondary' },
    { label: 'Code Quality Rating', value: '99%', icon: Code, color: 'text-highlight' },
    { label: 'Developer Mentorships', value: '10+', icon: Award, color: 'text-accent' },
  ];

  return (
    <section id="about" className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-bgMain overflow-hidden">

      {/* Aurora blur circle */}
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">

        {/* Title Block */}
        <div className="text-center md:text-left space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-secondary tracking-widest uppercase"
          >
            <ChevronRight className="w-4 h-4 text-highlight animate-pulse" />
            <span>01. THE STORY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl heading-premium text-white font-extrabold"
          >
            My Story So Far
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-sm md:text-base text-muted max-w-xl leading-relaxed"
          >
            Based in Calicut, Kerala, I craft interactive digital landscapes with performance-first architectures. Here is how my engineering journey took shape.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-40 glass-panel-hover"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color} text-glow-primary`} />
                </div>
                <div className="text-3xl md:text-4xl heading-premium font-black text-white">{stat.value}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Orb node on timeline path */}
              <div
                className="absolute left-[-6px] top-1.5 w-3.5 h-3.5 rounded-full bg-bgMain border-2 transition-transform duration-300 group-hover:scale-125"
                style={{ borderColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
              />

              {/* Company & Year details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg font-bold text-white tracking-wide font-sans group-hover:text-glow-primary transition-colors">
                    {item.company}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted">
                    {item.role}
                  </span>
                </div>
                <div className="text-xs font-mono text-glow-secondary" style={{ color: item.color }}>
                  {item.year}
                </div>
              </div>

              {/* Description Card */}
              <div className="glass-panel p-6 rounded-2xl space-y-4 shadow-glass max-w-4xl hover:border-white/15 transition-colors">
                <p className="text-sm text-muted leading-relaxed font-sans">{item.description}</p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-muted hover:border-white/15 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Links Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-2xl glass-panel border border-primary/30 flex flex-wrap items-center justify-between gap-6 shadow-neon-primary"
        >
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Deep Dive into Architecture & Runtimes
            </h3>
            <p className="text-xs md:text-sm text-gray-300">
              Explore interactive visual explanations for Frontend Structure, Event Loop, React 19, and Jasir's complete CV.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/learn"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/learn');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wider uppercase shadow-neon-primary hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore /learn</span>
              <span>→</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
