console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
/*
const navLinks = $$("nav a");

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

if (currentLink) {
  currentLink.classList.add("current");
}
  */

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"
  : "/portfolio/";

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/resume.html', title: 'Resume' },
    { url: 'https://github.com/Leo130805', title: 'GitHub' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    url = !url.startsWith('http') ? BASE_PATH + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;

    // Highlight current page
    let resolved = new URL(url, location);
    if (resolved.host === location.host && resolved.pathname === location.pathname) {
        a.classList.add("current");
    }

    // Open external links in a new tab
    if (url.startsWith('http')) {
        a.target = "_blank";
        a.rel = "noopener";
    }

    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select id="color-scheme-select">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    `
);

const select = document.getElementById('color-scheme-select');
const saved = localStorage.getItem('color-scheme');
if (saved) {
    document.documentElement.style.colorScheme = saved;
    select.value = saved;
}

select.addEventListener('change', (e) => {
    const scheme = e.target.value;
    document.documentElement.style.colorScheme = scheme;
    localStorage.setItem('color-scheme', scheme);
  });
