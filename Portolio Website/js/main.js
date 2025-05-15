

document.addEventListener('DOMContentLoaded', function () {
  initTheme();

  populateSkills();
  populateProjects();
  populateBlogs();

  setupEventListeners();


  initScrollBehavior();


  document.getElementById('current-year').textContent = new Date().getFullYear();


  updateThemeIcons();
});


function initTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}

function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.body.classList.contains('dark');
  const themeIcons = document.querySelectorAll('.theme-icon');

  themeIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
}

// Mobile Menu Management
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');

  mobileNav.classList.toggle('active');

  if (mobileNav.classList.contains('active')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
}


function initScrollBehavior() {
  window.addEventListener('scroll', function () {
    const header = document.getElementById('header');

    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function scrollToSection(e) {
  e.preventDefault();

  const href = e.currentTarget.getAttribute('href');
  if (!href || href === '#') return;

  const targetSection = document.querySelector(href);
  if (targetSection) {
    window.scrollTo({
      top: targetSection.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    });


    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  }
}


function populateSkills() {
  const skillsList = document.getElementById('skills-list');

  skills.forEach(skill => {
    const skillTag = document.createElement('span');
    skillTag.className = 'skill-tag';
    skillTag.textContent = skill;
    skillsList.appendChild(skillTag);
  });
}

function populateProjects() {
  const projectsGrid = document.getElementById('projects-grid');

  projects.forEach(project => {

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.dataset.category = project.category;


    const imageContainer = document.createElement('div');
    imageContainer.className = 'project-image';

    const image = document.createElement('img');
    image.src = project.image;
    image.alt = project.title;

    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';

    const overlayContent = document.createElement('div');
    overlayContent.className = 'project-overlay-content';

    const tags = document.createElement('div');
    tags.className = 'project-tags';

    project.tags.slice(0, 2).forEach((tag, index) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'project-tag';
      tagSpan.textContent = tag;
      tags.appendChild(tagSpan);
    });


    const links = document.createElement('div');
    links.className = 'project-links';

    if (project.liveUrl) {
      const liveLink = document.createElement('a');
      liveLink.href = project.liveUrl;
      liveLink.className = 'project-link';
      liveLink.setAttribute('target', '_blank');
      liveLink.setAttribute('rel', 'noopener noreferrer');
      liveLink.setAttribute('aria-label', 'Live Demo');
      liveLink.innerHTML = '<i class="fas fa-external-link-alt"></i>';
      links.appendChild(liveLink);
    }

    if (project.githubUrl) {
      const githubLink = document.createElement('a');
      githubLink.href = project.githubUrl;
      githubLink.className = 'project-link';
      githubLink.setAttribute('target', '_blank');
      githubLink.setAttribute('rel', 'noopener noreferrer');
      githubLink.setAttribute('aria-label', 'GitHub Repository');
      githubLink.innerHTML = '<i class="fab fa-github"></i>';
      links.appendChild(githubLink);
    }

    overlayContent.appendChild(tags);
    overlayContent.appendChild(links);
    overlay.appendChild(overlayContent);

    imageContainer.appendChild(image);
    imageContainer.appendChild(overlay);


    const content = document.createElement('div');
    content.className = 'project-content';

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;

    const contentTags = document.createElement('div');
    contentTags.className = 'project-content-tags';

    project.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'project-content-tag';
      tagSpan.textContent = tag;
      contentTags.appendChild(tagSpan);
    });

    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(contentTags);

    // Assemble the project card
    projectCard.appendChild(imageContainer);
    projectCard.appendChild(content);

    projectsGrid.appendChild(projectCard);
  });
}

function populateBlogs() {
  const blogGrid = document.getElementById('blog-grid');

  blogPosts.forEach(post => {

    const blogCard = document.createElement('article');
    blogCard.className = 'blog-card';


    const imageContainer = document.createElement('div');
    imageContainer.className = 'blog-image';

    const image = document.createElement('img');
    image.src = post.image;
    image.alt = post.title;

    imageContainer.appendChild(image);


    const content = document.createElement('div');
    content.className = 'blog-content';


    const meta = document.createElement('div');
    meta.className = 'blog-meta';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'blog-meta-item';
    dateSpan.innerHTML = `<i class="far fa-calendar"></i> ${post.date}`;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'blog-meta-item';
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${post.readTime}`;

    meta.appendChild(dateSpan);
    meta.appendChild(timeSpan);


    const title = document.createElement('h3');
    title.className = 'blog-title';

    const titleLink = document.createElement('a');
    titleLink.href = post.url;
    titleLink.textContent = post.title;

    title.appendChild(titleLink);

    const excerpt = document.createElement('p');
    excerpt.className = 'blog-excerpt';
    excerpt.textContent = post.excerpt;


    const readMore = document.createElement('a');
    readMore.href = post.url;
    readMore.className = 'blog-link';
    readMore.innerHTML = 'Daha Fazlası <i class="fas fa-arrow-right"></i>';


    content.appendChild(meta);
    content.appendChild(title);
    content.appendChild(excerpt);
    content.appendChild(readMore);


    blogCard.appendChild(imageContainer);
    blogCard.appendChild(content);

    blogGrid.appendChild(blogCard);
  });
}

// Proje filtrelemesi
function filterProjects(category) {
  const projectCards = document.querySelectorAll('.project-card');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // update butonu
  filterButtons.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // proje filtreleme
  projectCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// contact formu
function handleContactSubmit(e) {
  e.preventDefault();


  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // basit kısıt
  if (!name || !email || !subject || !message) {
    showToast('Error', 'Please fill in all fields', 'error');
    return;
  }

  // email kısıtı
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Error', 'Please enter a valid email address', 'error');
    return;
  }


  const formData = {
    name,
    email,
    subject,
    message
  };


  console.log('Form submitted:', formData);

  // basarılı mesajı
  showToast('Başarılı', 'Mesajınız İçin Teşekkürler En Yakın Zamanda Geri Döneceğim.', 'success');

  // formu resetleme
  e.target.reset();
}

// Toast bildirimleri
function showToast(title, message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');

  // toast olusturma
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  // toast ikonu
  const icon = document.createElement('div');
  icon.className = 'toast-icon';

  if (type === 'success') {
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
  } else if (type === 'error') {
    icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
  }

  // toast içeriği
  const content = document.createElement('div');
  content.className = 'toast-content';

  const titleElem = document.createElement('div');
  titleElem.className = 'toast-title';
  titleElem.textContent = title;

  const messageElem = document.createElement('div');
  messageElem.className = 'toast-message';
  messageElem.textContent = message;

  content.appendChild(titleElem);
  content.appendChild(messageElem);

  // kapatma butonu
  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  closeBtn.addEventListener('click', () => {
    toast.style.animation = 'slideOut 0.3s forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  });


  toast.appendChild(icon);
  toast.appendChild(content);
  toast.appendChild(closeBtn);

  // konteynere ekleme
  toastContainer.appendChild(toast);

  // 5 saniyeden sonra silme
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'slideOut 0.3s forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }
  }, 5000);
}

// event listenerleri ayarlama
function setupEventListeners() {
  // Theme toggle buttons
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('mobile-theme-toggle').addEventListener('click', toggleTheme);


  document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', scrollToSection);
  });

  // proje filtreleme butonları
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterProjects(btn.dataset.filter);
    });
  });


  document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
}