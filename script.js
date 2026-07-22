// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const THEME_KEY = 'theme-preference';

// Initialize theme on page load
function initTheme() {
  // Check localStorage for saved preference
  let savedTheme = localStorage.getItem(THEME_KEY);
  
  // If no saved preference, check system preference
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    savedTheme = prefersDark ? 'dark' : 'light';
  }
  
  // Apply the theme
  applyTheme(savedTheme);
}

// Apply theme to document
function applyTheme(theme) {
  if (theme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    html.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem(THEME_KEY, theme);
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't set a preference
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// Initialize theme on load
initTheme();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.contains('open');
  if (isOpen) {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  } else {
    navList.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
  }
});

// Close mobile nav when a link is clicked
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
