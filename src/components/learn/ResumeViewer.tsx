import React, { useState } from 'react';
import { 
  Download, Printer, Check, Copy, 
  Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Code2, Sparkles, Globe
} from 'lucide-react';
import { RESUME_DATA } from '../../utils/resumeData';
import { downloadResumePdf } from '../../utils/pdfGenerator';
import confetti from 'canvas-confetti';

export const ResumeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modern' | 'ats'>('modern');
  const [copiedContact, setCopiedContact] = useState(false);
  const r = RESUME_DATA;

  const handleDownload = () => {
    downloadResumePdf();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(r.email);
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  return (
    <div className="w-full space-y-8 select-none">
      {/* Top Header Card with Download CTA */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-secondary uppercase tracking-wider font-bold">
              Curriculum Vitae & Verified Experience
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
              Ready for Hire
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {r.name}
          </h2>
          <p className="text-xs md:text-sm text-gray-300 font-mono">
            {r.title}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('modern')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'modern' ? 'bg-primary/30 text-white font-bold' : 'text-muted hover:text-white'
              }`}
            >
              Interactive Modern
            </button>
            <button
              onClick={() => setActiveTab('ats')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'ats' ? 'bg-primary/30 text-white font-bold' : 'text-muted hover:text-white'
              }`}
            >
              ATS Paper View
            </button>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs flex items-center gap-2 shadow-neon-primary hover:scale-105 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </button>

          {/* Direct Print Button */}
          <button
            onClick={handleDownload}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-muted hover:text-white transition-all cursor-pointer"
            title="Print CV"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Resume Presentation View */}
      {activeTab === 'modern' ? (
        <div className="space-y-6">
          {/* Quick Contact & Links Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
              <div className="text-xs">
                <span className="text-muted block text-[10px] uppercase font-mono">Location</span>
                <span className="text-white font-medium">{r.location}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-xs">
                <span className="text-muted block text-[10px] uppercase font-mono">Direct Phone</span>
                <span className="text-white font-medium">{r.phone}</span>
              </div>
            </div>

            <div 
              onClick={handleCopyEmail}
              className="p-4 rounded-xl glass-panel border border-white/5 hover:border-primary/40 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-muted block text-[10px] uppercase font-mono">Email Address</span>
                  <span className="text-white font-medium">{r.email}</span>
                </div>
              </div>
              {copiedContact ? <Check className="w-3.5 h-3.5 text-highlight" /> : <Copy className="w-3.5 h-3.5 text-muted group-hover:text-white" />}
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-highlight flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-muted block text-[10px] uppercase font-mono">Experience</span>
                  <span className="text-white font-medium">6+ Years Senior</span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-highlight font-mono">Verified</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase text-secondary tracking-wider font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-highlight" />
              Professional Summary
            </h3>
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans">
              {r.summary}
            </p>
          </div>

          {/* Core Skills Grid */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase text-secondary tracking-wider font-bold flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              Core Competencies & Technology Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {r.coreSkills.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <h4 className="text-xs font-mono text-highlight font-semibold">
                    {cat.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Breakdown */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
            <h3 className="text-xs font-mono uppercase text-secondary tracking-wider font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-secondary" />
              Professional Experience History
            </h3>

            <div className="space-y-6">
              {r.experience.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {exp.role} <span className="text-muted font-normal">@ {exp.company}</span>
                      </h4>
                      <span className="text-xs font-mono text-secondary">{exp.location}</span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                      {exp.period}
                    </span>
                  </div>

                  {/* Project highlights */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="space-y-4 pt-1">
                      <span className="text-[11px] font-mono uppercase text-muted tracking-wider block">
                        Enterprise Deliverables & Projects:
                      </span>
                      <div className="space-y-3">
                        {exp.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="p-3.5 rounded-lg bg-white/5 border border-white/5 space-y-2">
                            <h5 className="text-xs font-bold text-highlight font-mono">
                              {proj.name}
                            </h5>
                            <p className="text-xs text-gray-300">
                              {proj.description}
                            </p>
                            <ul className="space-y-1 pl-4 list-disc text-xs text-gray-300">
                              {proj.points.map((pt, ptIdx) => (
                                <li key={ptIdx}>{pt}</li>
                              ))}
                            </ul>
                            <div className="text-[10px] font-mono text-muted pt-1">
                              <em>Tech Stack: {proj.technologies.join(', ')}</em>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional bullets */}
                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-1.5 pl-4 list-disc text-xs text-gray-300">
                      {exp.description.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  )}

                  <div className="text-[10px] font-mono text-muted pt-2 border-t border-white/5">
                    Technologies: {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-secondary tracking-wider font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                Education
              </h3>
              <div className="space-y-3">
                {r.education.map((edu, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{edu.degree}</div>
                      <div className="text-[11px] text-muted">{edu.institution}</div>
                    </div>
                    <span className="text-xs font-mono text-secondary">{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-secondary tracking-wider font-bold flex items-center gap-2">
                <Globe className="w-4 h-4 text-highlight" />
                Languages & Communication
              </h3>
              <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {r.languages.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
                      💬 {lang} (Professional Proficiency)
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted pt-1">
                  Experienced collaborating across international distributed squads and multinational clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ATS Paper Clean White Print Preview */
        <div className="p-8 md:p-12 rounded-2xl bg-white text-slate-900 font-sans shadow-2xl border border-gray-300 max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h1 className="text-3xl font-extrabold tracking-wide text-slate-900">{r.name}</h1>
            <p className="text-sm font-semibold text-indigo-700">{r.title}</p>
            <p className="text-xs text-slate-600">
              {r.location} | {r.phone} | <a href={`mailto:${r.email}`} className="text-indigo-600 underline">{r.email}</a> | LinkedIn | GitHub
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Professional Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {r.summary}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Core Skills
            </h3>
            <div className="space-y-1 text-xs text-slate-700">
              {r.coreSkills.map((cat, idx) => (
                <div key={idx}>
                  <strong className="text-slate-900">{cat.category}: </strong>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Professional Experience
            </h3>
            {r.experience.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <strong className="text-slate-900">{exp.role}</strong>
                    <span className="text-slate-700"> | <strong>{exp.company}</strong></span>
                  </div>
                  <span className="text-slate-500 font-medium">{exp.period} | {exp.location}</span>
                </div>

                {exp.projects && exp.projects.map((p, pIdx) => (
                  <div key={pIdx} className="pl-3 border-l-2 border-slate-300 text-xs text-slate-700 space-y-1 my-1.5">
                    <strong className="text-slate-900">{p.name}</strong>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {p.points.map((pt, ptIdx) => (
                        <li key={ptIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {exp.description && (
                  <ul className="list-disc pl-4 text-xs text-slate-700 space-y-0.5">
                    {exp.description.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1">
              Education
            </h3>
            <div className="space-y-1 text-xs text-slate-700">
              {r.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <span><strong>{edu.degree}</strong>, {edu.institution}</span>
                  <span className="text-slate-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
