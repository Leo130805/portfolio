console.log("IT’S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

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

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();                         // stop the default submit
    const data = new FormData(form);            // grab subject & body
    const parts = [];

    for (let [name, value] of data) {
      // encode spaces as %20 (not +) and any other special chars
      parts.push(`${name}=${encodeURIComponent(value)}`);
    }

    // stitch into mailto URL and open your mail client
    const mailtoURL = `${form.action}?${parts.join('&')}`;
    location.href = mailtoURL;
  });
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = ''; // Step 2: Clear existing content

  projects.forEach(project => {
    const card = document.createElement('div');
    card.classList.add('project-card');
  
    card.innerHTML = `
      <${headingLevel}>${project.title}</${headingLevel}>
      <img class="project-image" src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    `;
  
    containerElement.appendChild(card);
  });  
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}



