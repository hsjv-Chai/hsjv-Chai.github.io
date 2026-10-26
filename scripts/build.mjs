import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const projects = JSON.parse(await readFile(`${root}data/projects.json`, 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
wallet:'<rect x="13" y="20" width="54" height="44" rx="8"/><path d="M15 27h42M57 20v-8L20 20m34 16h16v16H54a8 8 0 0 1 0-16Z"/><circle cx="59" cy="44" r="1.5"/>',
photo:'<rect x="17" y="14" width="48" height="53" rx="3" transform="rotate(8 41 40)"/><rect x="12" y="12" width="48" height="53" rx="3" fill="var(--art-bg)"/><path d="m15 50 14-17 11 12 8-8 9 13M13 55h46"/><circle cx="46" cy="26" r="5"/>',
book:'<path d="M40 23c-9-8-19-9-30-7v44c11-2 21-1 30 7 9-8 19-9 30-7V16c-11-2-21-1-30 7Zm0 0v44M20 29l10 3m-10 9 10 3m20-12 10-3m-10 15 10-3"/>',
mark:'<path d="M11 54V26l14 18 14-18v28m7-12h22m-11-11 11 11-11 11"/>',
chat:'<path d="M57 52c9-2 15-9 15-18 0-11-11-20-24-20S24 23 24 34s11 20 24 20l12 8-3-10Z"/><path d="M23 31C13 33 7 40 7 49s8 17 19 18l-1 8 11-8c9-1 16-6 18-12M37 33h22M37 40h14"/>',
melon:'<path d="M8 29h64c-2 21-13 36-32 36S10 50 8 29Z"/><path d="M15 29c2 17 11 28 25 28s23-11 25-28M28 37l2 5m10-4v6m12-7-2 5"/><path d="M38 25c-2-9 5-16 13-13-1 7-6 11-13 13Z"/>',
drive:'<rect x="17" y="9" width="46" height="62" rx="7"/><circle cx="40" cy="32" r="13"/><circle cx="40" cy="32" r="4"/><path d="m43 35 11 11M26 61h14m10 0h4"/>',
fish:'<path d="M12 40c17-23 35-23 48 0-13 23-31 23-48 0Zm48 0 14-14v28L60 40Z"/><circle cx="26" cy="36" r="2"/><path d="m37 22 8-9 5 14m-13 31 8 9 5-14M8 15v7m-3-3h6"/>'
};
const seen = new Set();
const html = projects.map((p, i) => {
  if (seen.has(p.repo) || !icons[p.icon] || !['desktop','web','experiment'].includes(p.category)) throw new Error(`Invalid project: ${p.repo}`);
  seen.add(p.repo);
  return `<article class="project-card ${p.featured ? 'featured' : ''}" data-category="${escape(p.category)}"><a href="https://github.com/hsjv-Chai/${encodeURIComponent(p.repo)}" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看${escape(p.name)}（新窗口）"><div class="project-art ${escape(p.tone)}" aria-hidden="true"><span class="art-index">${String(i+1).padStart(2,'0')} /</span><svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${icons[p.icon]}</svg>${p.featured ? '<span class="featured-word">MoneyBook<small>让每一笔，都有迹可循。</small></span>' : ''}<span class="art-note">${escape(p.note)}</span><span class="art-name">${escape(p.english)}</span></div><div class="project-info"><div class="project-name-row"><h3>${escape(p.name)}</h3><span class="project-arrow" aria-hidden="true">↗</span></div><p>${escape(p.description)}</p><div class="project-meta"><span class="meta-dot"></span><span>${escape(p.platform)}</span><span class="tech">${escape(p.tech)} · GitHub</span></div></div></a></article>`;
}).join('\n');
const template = await readFile(`${root}src/index.html`, 'utf8');
const output = template.replaceAll('{{COUNT}}', String(projects.length).padStart(2,'0')).replace('{{PROJECTS}}', html);
if (/\{\{\w+\}\}/.test(output)) throw new Error('Unresolved template token');
await mkdir(`${root}dist`, { recursive:true });
await writeFile(`${root}dist/index.html`, output);
await cp(`${root}public`, `${root}dist`, { recursive:true });
for (const file of ['styles.css','app.js']) await cp(`${root}src/${file}`, `${root}dist/${file}`);
await writeFile(`${root}dist/.nojekyll`, '');
await writeFile(`${root}dist/robots.txt`, 'User-agent: *\nAllow: /\nSitemap: https://hsjv-chai.github.io/sitemap.xml\n');
await writeFile(`${root}dist/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://hsjv-chai.github.io/</loc></url></urlset>');
console.log(`Built ${projects.length} public projects → dist/`);
