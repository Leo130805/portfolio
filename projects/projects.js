import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
    const projects = await fetchJSON('./lib/projects.json');
    console.log(projects);

    const projectsContainer = document.querySelector('.projects');

    const projectsTitle = document.querySelector('.projects-title');
    projectsTitle.textContent = `${projects.length} Projects`;

    renderProjects(projects, projectsContainer, 'h2');
}

loadProjects();