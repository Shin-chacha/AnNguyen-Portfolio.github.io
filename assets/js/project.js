/* Project case-study page: project.html?id=<project id from data.js>.
   Sections with no content in data.js are hidden automatically. */
(function () {
  "use strict";
  const { P, icon, esc, projects, projectSkills, params } = window.PF;
  window.PF.renderHeader("projects");
  window.PF.renderFooter();

  const id = params().get("id");
  const p = projects.find((x) => x.id === id);
  const el = document.getElementById("case");

  if (!p) {
    el.innerHTML = `<div class="page-head"><h1>Project not found</h1>
      <p class="section-sub">This project doesn't exist or has moved. <a href="projects.html">Browse all projects</a>.</p></div>`;
    document.title = "Project not found · " + P.profile.name;
    return;
  }

  document.title = `${p.title} · ${P.profile.name}`;
  const catNames = (p.categories || []).map((c) => (P.categories.find((x) => x.id === c) || { name: c }).name);
  const asList = (v) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
  const section = (title, v) => {
    const items = asList(v);
    if (!items.length) return "";
    return `<section><h2>${title}</h2>${items.length === 1 ? `<p>${esc(items[0])}</p>` : `<ul class="list">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`}</section>`;
  };
  const sk = projectSkills(p);
  const others = projects.filter((x) => x.id !== p.id && x.featured).slice(0, 3);

  el.innerHTML = `
    <div class="case">
      <article>
        <p class="kicker">Project · ${esc(catNames.join(" · "))} · ${esc(p.year || "")}</p>
        <h1>${esc(p.title)}</h1>
        <p class="lead">${esc(p.summary || "")}</p>
        ${asList(p.links).length ? `<div class="links">${p.links.map((l, i) =>
          `<a class="btn ${i === 0 ? "btn--primary" : "btn--ghost"}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon("ext", 14)}</a>`).join("")}</div>` : ""}
        ${section("Problem", p.problem)}
        ${section("Data", p.data)}
        ${section("Method", p.method)}
        ${section("Result", p.result)}
        ${section("My contribution", p.contribution)}
        ${section("Limitations", p.limitations)}
        ${section("What I learned", p.learned)}
      </article>
      <aside class="aside">
        <div class="card">
          <h2>Skills used</h2>
          <ul class="chips">${sk.map((s) => `<li><a class="chip" href="index.html?skill=${encodeURIComponent(s.id)}#map">${esc(s.name)}</a></li>`).join("")}</ul>
        </div>
        <div class="card">
          <h2>Details</h2>
          <dl>
            <dt>Year</dt><dd>${esc(p.year || "—")}</dd>
            <dt>Type</dt><dd>${esc(p.subtitle || "—")}</dd>
            <dt>Area</dt><dd>${esc(catNames.join(", ") || "—")}</dd>
          </dl>
        </div>
        ${others.length ? `<div class="card"><h2>More projects</h2><ul class="ev-list" style="margin-top:4px">${others.map((o) =>
          `<li><a href="project.html?id=${encodeURIComponent(o.id)}" style="margin:0;min-height:0;display:inline">${esc(o.short || o.title)}</a></li>`).join("")}</ul></div>` : ""}
      </aside>
    </div>`;
})();
