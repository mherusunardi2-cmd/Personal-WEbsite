// ========================================
// SCRIPT.JS — Portfolio M. Heru Sunardi
// ========================================

// ----------------------------------------
// 1. CUSTOM CURSOR
// ----------------------------------------
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  }, 80);
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// ----------------------------------------
// 2. LOADER
// ----------------------------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ----------------------------------------
// 3. NAVBAR
// ----------------------------------------
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ----------------------------------------
// 4. SCROLL REVEAL
// ----------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

function initReveal() {
  document.querySelectorAll(
    '.timeline-item, .skill-category, .cert-card'
  ).forEach(el => revealObserver.observe(el));
}

// ----------------------------------------
// 5. RENDER FUNCTIONS
// ----------------------------------------

function renderHero(data) {
  document.getElementById('hero-photo').src         = data.photo;
  document.getElementById('hero-name').textContent  = data.name;
  document.getElementById('hero-title').textContent = data.title;
  document.getElementById('hero-location-text').textContent = data.location;
  document.getElementById('footer-name').textContent = '© 2026 ' + data.name;
}

function renderAbout(data) {
  document.getElementById('about-summary').textContent = data.summary;

  document.getElementById('about-stats').innerHTML = data.stats.map(s => `
    <div class="stat-item">
      <span class="stat-number">${s.value}</span>
      <span class="stat-label">${s.label}</span>
    </div>
  `).join('');
}

function renderExperience(data) {
  document.getElementById('timeline').innerHTML = data.experience.map(job => `
    <div class="timeline-item">
      <div class="timeline-dot ${job.current ? 'current' : ''}"></div>
      <p class="timeline-period">${job.period}</p>
      <h3 class="timeline-title">${job.title}</h3>
      <p class="timeline-company">${job.company}</p>
      ${job.current ? '<span class="timeline-badge">Posisi Saat Ini</span>' : ''}
      <ul class="timeline-points">
        ${job.points.map(p => `<li>${p}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderSkills(data) {
  document.getElementById('skills-grid').innerHTML = Object.entries(data.skills)
    .map(([category, tags]) => `
      <div class="skill-category">
        <p class="skill-cat-title">${category}</p>
        <div class="skill-tags">
          ${tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
}

function renderEducation(data) {
  document.getElementById('education-list').innerHTML = data.education.map(edu => `
    <div class="edu-card">
      <p class="edu-period">${edu.period}</p>
      <h3 class="edu-degree">${edu.degree}</h3>
      <p class="edu-institution">${edu.institution}</p>
      <div class="edu-meta">
        <div class="edu-meta-item">
          <p class="edu-meta-label">IPK</p>
          <p class="edu-meta-value">${edu.gpa}</p>
        </div>
        <div class="edu-meta-item">
          <p class="edu-meta-label">Predikat</p>
          <p class="edu-meta-value">${edu.predicate}</p>
        </div>
      </div>
      <p class="edu-thesis">"${edu.thesis}"</p>
    </div>
  `).join('');
}

function renderCertifications(data) {
  document.getElementById('cert-grid').innerHTML = data.certifications.map(cert => `
    <div class="cert-card">
      <p class="cert-year">${cert.year} — ${cert.issuer}</p>
      <p class="cert-name">${cert.name}</p>
      <p class="cert-issuer">${cert.issuer}</p>
    </div>
  `).join('');
}

function renderContact(data) {
  const iconMap = {
    'fa-envelope' : 'fa-solid fa-envelope',
    'fa-linkedin' : 'fa-brands fa-linkedin',
    'fa-whatsapp' : 'fa-brands fa-whatsapp'
  };

  document.getElementById('contact-links').innerHTML = data.contact.map(item => `
    <a href="${item.href}" target="_blank" class="contact-link">
      <div class="contact-icon">
        <i class="${iconMap[item.icon] || 'fa-solid fa-link'}"></i>
      </div>
      <div class="contact-info">
        <p class="contact-label">${item.label}</p>
        <p class="contact-value">${item.value}</p>
      </div>
    </a>
  `).join('');
}

// ----------------------------------------
// 6. MAIN — ambil JSON lalu render semua
// ----------------------------------------
fetch('data/profile.json')
  .then(res => {
    if (!res.ok) throw new Error('Gagal membaca profile.json');
    return res.json();
  })
  .then(data => {
    renderHero(data);
    renderAbout(data);
    renderExperience(data);
    renderSkills(data);
    renderEducation(data);
    renderCertifications(data);
    renderContact(data);
    initReveal();
  })
  .catch(err => console.error('Error:', err));