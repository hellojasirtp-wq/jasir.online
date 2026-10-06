import { RESUME_DATA } from './resumeData';

export const generateResumeHtml = (): string => {
  const r = RESUME_DATA;

  const skillsHtml = r.coreSkills
    .map(
      (cat) => `
      <div style="margin-bottom: 6px;">
        <strong style="color: #1e293b; font-size: 11px;">${cat.category}:</strong>
        <span style="color: #334155; font-size: 11px;">${cat.skills.join(', ')}</span>
      </div>
    `
    )
    .join('');

  const expHtml = r.experience
    .map(
      (exp) => `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <div>
            <strong style="font-size: 13px; color: #0f172a;">${exp.role}</strong>
            <span style="color: #475569; font-size: 12px; margin-left: 6px;">| <strong>${exp.company}</strong></span>
          </div>
          <div style="font-size: 11px; color: #64748b; font-weight: 500;">
            ${exp.period} | ${exp.location}
          </div>
        </div>

        ${
          exp.projects
            ? exp.projects
                .map(
                  (p) => `
            <div style="margin-top: 6px; margin-bottom: 8px; padding-left: 8px; border-left: 2px solid #cbd5e1;">
              <div style="font-size: 11.5px; font-weight: 600; color: #1e293b; margin-bottom: 2px;">
                ${p.name}
              </div>
              <ul style="margin: 0; padding-left: 16px; font-size: 10.5px; color: #334155; line-height: 1.45;">
                ${p.points.map((pt) => `<li style="margin-bottom: 2px;">${pt}</li>`).join('')}
              </ul>
              <div style="font-size: 9.5px; color: #64748b; margin-top: 3px;">
                <em>Technologies: ${p.technologies.join(', ')}</em>
              </div>
            </div>
          `
                )
                .join('')
            : ''
        }

        ${
          exp.description
            ? `
          <ul style="margin: 4px 0 0 0; padding-left: 16px; font-size: 10.5px; color: #334155; line-height: 1.45;">
            ${exp.description.map((d) => `<li style="margin-bottom: 2px;">${d}</li>`).join('')}
          </ul>
        `
            : ''
        }

        <div style="font-size: 9.5px; color: #64748b; margin-top: 3px;">
          <em>Technologies: ${exp.technologies.join(', ')}</em>
        </div>
      </div>
    `
    )
    .join('');

  const eduHtml = r.education
    .map(
      (edu) => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px;">
        <span style="color: #0f172a; font-weight: 600;">${edu.degree}, <span style="font-weight: 400; color: #475569;">${edu.institution}</span></span>
        <span style="color: #64748b;">${edu.period}</span>
      </div>
    `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Jasir_TP_Resume</title>
  <style>
    @page {
      size: letter;
      margin: 12mm 14mm 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.35;
      font-size: 11px;
      margin: 0;
      padding: 0;
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #0f172a;
      margin-bottom: 2px;
    }
    .title {
      font-size: 12px;
      font-weight: 600;
      color: #4338ca;
      margin-bottom: 4px;
    }
    .contact-info {
      font-size: 10px;
      color: #475569;
    }
    .contact-info a {
      color: #4338ca;
      text-decoration: none;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #0f172a;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
    }
    .summary-text {
      font-size: 10.5px;
      color: #334155;
      line-height: 1.45;
      text-align: justify;
      margin: 0;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${r.name}</div>
    <div class="title">${r.title}</div>
    <div class="contact-info">
      ${r.location} &nbsp;|&nbsp; 
      <strong>${r.phone}</strong> &nbsp;|&nbsp; 
      <a href="mailto:${r.email}">${r.email}</a> &nbsp;|&nbsp; 
      <a href="${r.linkedin}" target="_blank">LinkedIn</a> &nbsp;|&nbsp; 
      <a href="${r.github}" target="_blank">GitHub</a>
    </div>
  </div>

  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <p class="summary-text">${r.summary}</p>

  <div class="section-title">CORE SKILLS</div>
  ${skillsHtml}

  <div class="section-title">PROFESSIONAL EXPERIENCE</div>
  ${expHtml}

  <div class="section-title">EDUCATION</div>
  ${eduHtml}

  <div class="section-title">LANGUAGES</div>
  <div style="font-size: 11px; color: #334155;">${r.languages.join(', ')}</div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
  </script>
</body>
</html>
`;
};

export const downloadResumePdf = () => {
  const html = generateResumeHtml();
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const printWindow = window.open(url, '_blank');
  if (!printWindow) {
    // Fallback if popup blocked: trigger direct html download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jasir_TP_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
